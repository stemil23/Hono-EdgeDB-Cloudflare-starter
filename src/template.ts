import { Hono } from 'hono';
import { generateSitemap } from './components/sitemap';

/**
 * Generates a base HTML template for the application
 * @param {string} content - The main content to be inserted into the template
 * @param {string} title - The title of the page (default: 'Movie Database')
 * @param {Hono} app - The Hono app instance for generating the sitemap
 * @returns {string} The complete HTML template as a string
 */
export function baseTemplate(content: string, title: string = 'Movie Database', app: Hono): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }
        nav {
            margin-bottom: 20px;
        }
        nav a {
            margin-right: 10px;
        }
        footer {
            margin-top: 40px;
            border-top: 1px solid #ccc;
            padding-top: 20px;
        }
        footer ul {
            columns: 2;
            -webkit-columns: 2;
            -moz-columns: 2;
        }
    </style>
</head>
<body>
    <nav>
        <a href="/">Home</a>
        <a href="/movies-list">Movies</a>
        <a href="/persons-list">Persons</a>
    </nav>
    <main>
        ${content}
    </main>
    ${generateSitemap(app)}
</body>
</html>
  `;
}