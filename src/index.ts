import { Hono, Context } from 'hono';
import { homeRoute } from './routes/home';
import { getAddMovieForm, addMovie, deleteMovie, editMovie, getEditMovieForm, getMovies, getMoviesList } from './routes/movies';
import { getPersonsList, getEditPersonForm, editPerson, deletePerson } from './routes/persons';
import { edgedb } from '@db/imports';


// At the top of the file, define your Env type
type Env = {
  EDGEDB_DSN: string;
  // Add any other environment variables or bindings here
};

// Update the app declaration
const app = new Hono<{ Bindings: Env }>();

/**
 * Home route handler
 * @param {Context<{ Bindings: Env }>} c - Hono context
 * @param {Hono<{ Bindings: Env }>} app - Hono app instance
 * @returns {Promise<void>}
 */
app.get('/', async (c: Context<{ Bindings: Env }>) => homeRoute(c, app));

/**
 * Get movies route handler
 * @param {Context<{ Bindings: Env }>} c - Hono context
 * @param {Hono<{ Bindings: Env }>} app - Hono app instance
 * @returns {Promise<void>}
 */
app.get('/movies', async (c: Context<{ Bindings: Env }>) => getMovies(c));

/**
 * Get add movie form route handler
 * @param {Context<{ Bindings: Env }>} c - Hono context
 * @param {Hono<{ Bindings: Env }>} app - Hono app instance
 * @returns {Promise<void>}
 */
app.get('/add-movie', async (c: Context<{ Bindings: Env }>) => getAddMovieForm(c, app));

/**
 * Add movie route handler
 * @param {Context<{ Bindings: Env }>} c - Hono context
 * @param {Hono<{ Bindings: Env }>} app - Hono app instance
 * @returns {Promise<void>}
 */
app.post('/add-movie', async (c: Context<{ Bindings: Env }>) => addMovie(c));

/**
 * Get movies list route handler
 * @param {Context<{ Bindings: Env }>} c - Hono context
 * @param {Hono<{ Bindings: Env }>} app - Hono app instance
 * @returns {Promise<void>}
 */
app.get('/movies-list', async (c: Context<{ Bindings: Env }>) => getMoviesList(c, app));

/**
 * Get edit movie form route handler
 * @param {Context<{ Bindings: Env }>} c - Hono context
 * @param {Hono<{ Bindings: Env }>} app - Hono app instance
 * @returns {Promise<void>}
 */
app.get('/edit-movie/:id', async (c: Context<{ Bindings: Env }>) => getEditMovieForm(c, app));

/**
 * Edit movie route handler
 * @param {Context<{ Bindings: Env }>} c - Hono context
 * @param {Hono<{ Bindings: Env }>} app - Hono app instance
 * @returns {Promise<void>}
 */
app.post('/edit-movie/:id', async (c: Context<{ Bindings: Env }>) => editMovie(c));

/**
 * Delete movie route handler
 * @param {Context<{ Bindings: Env }>} c - Hono context
 * @param {Hono<{ Bindings: Env }>} app - Hono app instance
 * @returns {Promise<void>}
 */
app.post('/delete-movie/:id', async (c: Context<{ Bindings: Env }>) => deleteMovie(c));

/**
 * Get persons list route handler
 * @param {Context<{ Bindings: Env }>} c - Hono context
 * @param {Hono<{ Bindings: Env }>} app - Hono app instance
 * @returns {Promise<void>}
 */
app.get('/persons-list', async (c: Context<{ Bindings: Env }>) => getPersonsList(c, app));

/**
 * Get edit person form route handler
 * @param {Context<{ Bindings: Env }>} c - Hono context
 * @param {Hono<{ Bindings: Env }>} app - Hono app instance
 * @returns {Promise<void>}
 */
app.get('/edit-person/:id', async (c: Context<{ Bindings: Env }>) => getEditPersonForm(c, app));

/**
 * Edit person route handler
 * @param {Context<{ Bindings: Env }>} c - Hono context
 * @param {Hono<{ Bindings: Env }>} app - Hono app instance
 * @returns {Promise<void>}
 */
app.post('/edit-person/:id', async (c: Context<{ Bindings: Env }>) => editPerson(c));

/**
 * Delete person route handler
 * @param {Context<{ Bindings: Env }>} c - Hono context
 * @param {Hono<{ Bindings: Env }>} app - Hono app instance
 * @returns {Promise<void>}
 */
app.post('/delete-person/:id', async (c: Context<{ Bindings: Env }>) => deletePerson(c, app));

export default app;