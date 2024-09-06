import { Context } from 'hono';
import { Hono } from 'hono';
import { baseTemplate } from '../template';

/**
 * Home route handler
 * @param {Context} c - Hono context
 * @param {Hono} app - Hono app instance
 * @returns {Response} HTML response for the home page
 */
export const homeRoute = (c: Context, app: Hono): Response => {
  const content = `
    <h1>Welcome to the Movie Database</h1>
    <p>Use the navigation above to explore the database.</p>
    <ul>
      <li><a href="/movies-list">View Movies</a></li>
      <li><a href="/persons-list">View Persons</a></li>
    </ul>
  `;
  return c.html(baseTemplate(content, 'Home', app));
};