import { Hono } from 'hono';

/**
 * Generates a sitemap HTML string from the routes of a Hono app
 * @param {Hono} app - The Hono app instance
 * @returns {string} HTML string representing the sitemap
 */
export function generateSitemap(app: Hono): string {
  const routes: string[] = app.routes.map(route => route.path);
  const uniqueRoutes: string[] = Array.from(new Set(routes)).sort();

  const sitemapItems: string = uniqueRoutes
    .filter(route => route !== '*' && !route.includes(':')) // Exclude wildcard routes and routes with :id
    .map(route => `<li><a href="${route}">${route}</a></li>`)
    .join('');

  return `
    <footer>
      <h2>Sitemap</h2>
      <ul>
        ${sitemapItems}
      </ul>
    </footer>
  `;
}