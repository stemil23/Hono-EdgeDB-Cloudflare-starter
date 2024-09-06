import { Context } from 'hono';
import { Hono } from 'hono';
import e from "../../dbschema/edgeql-js";
import { Person as DBPerson } from "../../dbschema/interfaces";
import { baseTemplate } from '../template';
import { createClient, handleError } from '../utils';

// Add this type definition
type QueryPerson = Pick<DBPerson, 'id' | 'name'> & {
  acted_in: { title: string }[];
};

/**
 * Get persons list route handler
 * @param {Context} c - Hono context
 * @param {Hono} app - Hono app instance
 * @returns {Promise<Response>} HTML response with the list of persons
 */
export const getPersonsList = async (c: Context, app: Hono): Promise<Response> => {
  try {
    const client = createClient(c.env.EDGEDB_DSN);
    const persons = await e.select(e.Person, () => ({
      id: true,
      name: true,
      acted_in: {
        title: true // Include title in the acted_in query
      }
    })).run(client);

    const personsList = persons.map((person: QueryPerson) => `
      <li>
        ${person.name}, ${person.acted_in.length > 0 ? person.acted_in.map(movie => movie.title).join(', ') : 'no movie in database'}
        <a href="/edit-person/${person.id}">Edit</a>
        ${person.acted_in.length === 0 ? `
        <form action="/delete-person/${person.id}" method="post" style="display:inline;">
          <button type="submit" onclick="return confirm('Are you sure you want to delete this person?')">Delete</button>
        </form>
        ` : ''}
      </li>
    `).join('');

    return c.html(baseTemplate(`
      <h1>Persons List</h1>
      <ul>${personsList}</ul>
    
    `, 'Persons List', app));
  } catch (error) {
    return handleError(c, error);
  }
};

/**
 * Get edit person form route handler
 * @param {Context} c - Hono context
 * @param {Hono} app - Hono app instance
 * @returns {Promise<Response>} HTML response with the edit person form
 */
export const getEditPersonForm = async (c: Context, app: Hono): Promise<Response> => {
  try {
    const personId = c.req.param('id');
    const client = createClient(c.env.EDGEDB_DSN);
    const persons = await e.select(e.Person, (person) => ({
      filter: e.op(person.id, '=', e.uuid(personId)),
      id: true,
      name: true
    })).run(client);

    if (!persons || persons.length === 0) {
      return c.html(baseTemplate(`
        <h1>Error</h1>
        <p>Person not found</p>
        <a href="/persons-list">Back to Persons List</a>
      `, 'Person Not Found', app), 404);
    }

    const person = persons[0];

    return c.html(baseTemplate(`
      <h1>Edit Person: ${person.name}</h1>
      <form action="/edit-person/${personId}" method="post">
        <input name="name" placeholder="Person Name" value="${person.name}" required>
        <button type="submit">Update Person</button>
      </form>
    `, 'Edit Person', app));
  } catch (error) {
    return handleError(c, error);
  }
};

/**
 * Edit person route handler
 * @param {Context} c - Hono context
 * @returns {Promise<Response>} Redirect response after editing the person
 */
export const editPerson = async (c: Context): Promise<Response> => {
  try {
    const personId = c.req.param('id');
    const { name } = await c.req.parseBody();
    const client = createClient(c.env.EDGEDB_DSN);

    await e.update(e.Person, (person) => ({
      filter: e.op(person.id, '=', e.uuid(personId)),
      set: {
        name: e.str(name as string)
      }
    })).run(client);

    return c.redirect('/persons-list');
  } catch (error) {
    return handleError(c, error);
  }
};

/**
 * Delete person route handler
 * @param {Context} c - Hono context
 * @param {Hono} app - Hono app instance
 * @returns {Promise<Response>} Redirect response after deleting the person
 */
export const deletePerson = async (c: Context, app: Hono): Promise<Response> => {
  try {
    const personId = c.req.param('id');
    const client = createClient(c.env.EDGEDB_DSN);

    const persons = await e.select(e.Person, (person) => ({
      filter: e.op(person.id, '=', e.uuid(personId)),
      id: true
    })).run(client);

    if (!persons || persons.length === 0) {
      return c.html(baseTemplate(`
        <h1>Error</h1>
        <p>Person not found</p>
        <a href="/persons-list">Back to Persons List</a>
      `, 'Person Not Found', app), 404);
    }

    await e.delete(e.Person, (person) => ({
      filter: e.op(person.id, '=', e.uuid(personId))
    })).run(client);

    return c.redirect('/persons-list');
  } catch (error) {
    return handleError(c, error);
  }
};