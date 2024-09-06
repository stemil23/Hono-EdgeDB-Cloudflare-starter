import { Context } from 'hono';
import { Hono } from 'hono';
import e from "../../dbschema/edgeql-js";
import { Movie as DBMovie } from "../../dbschema/interfaces";
import { baseTemplate } from '../template';
import { createClient, handleError } from '../utils';

/**
 * Get movies route handler
 * @param {Context} c - Hono context
 * @returns {Promise<Response>}
 */
export const getMovies = async (c: Context): Promise<Response> => {
  const client = createClient(c.env.EDGEDB_DSN);
  try {
    const movies = await e.select(e.Movie, () => ({
      id: true,
      title: true,
      actors: {
        id: true,
        name: true
      }
    })).run(client) as DBMovie[];
    return c.json(movies);
  } catch (error) {
    return handleError(c, error);
  }
};

/**
 * Get add movie form route handler
 * @param {Context} c - Hono context
 * @param {Hono} app - Hono app instance
 * @returns {Response}
 */
export const getAddMovieForm = (c: Context, app: Hono): Response => c.html(baseTemplate(`
  <h1>Add New Movie</h1>
  <form action="/add-movie" method="post">
    <input name="title" placeholder="Movie Title" required>
    <input name="actorName" placeholder="Actor Name" required>
    <button type="submit">Add Movie</button>
  </form>
`, 'Add Movie', app));

/**
 * Add movie route handler
 * @param {Context} c - Hono context
 * @returns {Promise<Response>}
 */
export const addMovie = async (c: Context): Promise<Response> => {
  const client = createClient(c.env.EDGEDB_DSN);
  try {
    const { title, actorName } = await c.req.parseBody();

    const result = await e.insert(e.Movie, {
      title: e.str(title as string),
      actors: e.insert(e.Person, {
        name: e.str(actorName as string)
      }).unlessConflict(
        person => ({
          on: person.name,
          else: person
        })
      )
    }).run(client) as DBMovie;

    return c.redirect('/movies-list');
  } catch (error) {
    return handleError(c, error);
  }
};

/**
 * Get movies list route handler
 * @param {Context} c - Hono context
 * @param {Hono} app - Hono app instance
 * @returns {Promise<Response>}
 */
export const getMoviesList = async (c: Context, app: Hono): Promise<Response> => {
  const client = createClient(c.env.EDGEDB_DSN);
  try {
    const movies = await e.select(e.Movie, () => ({
      id: true,
      title: true,
      actors: {
        id: true,
        name: true,
        acted_in: {
          id: true,
          title: true,
          actors: {
            id: true,
            name: true
          }
        }
      }
    })).run(client) as DBMovie[];

    const moviesList = movies.map((movie) => `
      <li>
        ${movie.title} (Actors: ${movie.actors.map((actor) => actor.name).join(', ')})
        <a href="/edit-movie/${movie.id}">Edit</a>
        <form action="/delete-movie/${movie.id}" method="post" style="display:inline;">
          <button type="submit" onclick="return confirm('Are you sure you want to delete this movie?')">Delete</button>
        </form>
      </li>
    `).join('');

    return c.html(baseTemplate(`
      <h1>Movies List</h1>
      <ul>${moviesList}</ul>
      <a href="/add-movie">Add New Movie</a>
    `, 'Movies List', app));
  } catch (error) {
    return handleError(c, error);
  }
};

/**
 * Delete movie route handler
 * @param {Context} c - Hono context
 * @returns {Promise<Response>}
 */
export const deleteMovie = async (c: Context): Promise<Response> => {
  const client = createClient(c.env.EDGEDB_DSN);
  try {
    const movieId = c.req.param('id');

    await e.delete(e.Movie, (movie) => ({
      filter: e.op(movie.id, '=', e.uuid(movieId))
    })).run(client);

    return c.redirect('/movies-list');
  } catch (error) {
    return handleError(c, error);
  }
};

/**
 * Get edit movie form route handler
 * @param {Context} c - Hono context
 * @param {Hono} app - Hono app instance
 * @returns {Promise<Response>}
 */
export const getEditMovieForm = async (c: Context, app: Hono): Promise<Response> => {
  const client = createClient(c.env.EDGEDB_DSN);
  try {
    const movieId = c.req.param('id');
    const movies = await e.select(e.Movie, (movie) => ({
      filter: e.op(movie.id, '=', e.uuid(movieId)),
      ...e.Movie['*'],
      actors: { name: true }
    })).run(client) as DBMovie[];

    if (!movies || movies.length === 0) {
      return c.html(baseTemplate(`
        <h1>Error</h1>
        <p>Movie not found</p>
        <a href="/movies-list">Back to Movies List</a>
      `, 'Movie Not Found', app), 404);
    }

    const movie = movies[0];
    const actorNames = movie.actors ? movie.actors.map((actor) => actor.name).join(', ') : '';

    return c.html(baseTemplate(`
      <h1>Edit Movie: ${movie.title}</h1>
      <form action="/edit-movie/${movieId}" method="post">
        <input name="title" placeholder="Movie Title" value="${movie.title}" required>
        <input name="actorNames" placeholder="Actor Names (comma-separated)" value="${actorNames}" required>
        <button type="submit">Update Movie</button>
      </form>
    `, 'Edit Movie', app));
  } catch (error) {
    return handleError(c, error);
  }
};

/**
 * Edit movie route handler
 * @param {Context} c - Hono context
 * @returns {Promise<Response>}
 */
export const editMovie = async (c: Context): Promise<Response> => {
  const client = createClient(c.env.EDGEDB_DSN);
  try {
    const movieId = c.req.param('id');
    const { title, actorNames } = await c.req.parseBody();

    const actorNamesArray = (actorNames as string).split(',').map(name => name.trim());

    await e.update(e.Movie, (movie) => ({
      filter: e.op(movie.id, '=', e.uuid(movieId)),
      set: {
        title: e.str(title as string),
        actors: e.set(
          ...actorNamesArray.map(name =>
            e.insert(e.Person, {
              name: e.str(name)
            }).unlessConflict((person) => ({
              on: person.name,
              else: e.select(e.Person, (p) => ({
                filter: e.op(p.name, '=', e.str(name))
              }))
            }))
          )
        )
      }
    })).run(client);

    return c.redirect('/movies-list');
  } catch (error) {
    return handleError(c, error);
  }
};