import { Context } from 'hono';
import * as edgedb from "edgedb";

/**
 * Handles errors and returns a JSON response
 * @param {Context} c - Hono context
 * @param {unknown} error - The error to handle
 * @returns {Response} JSON response with error details
 */
export const handleError = (c: Context, error: unknown): Response => {
  console.error('Error:', error);
  return c.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, 500);
};

/**
 * Creates an EdgeDB HTTP client
 * @param {string} dsn - Data Source Name for the EdgeDB connection
 * @returns {edgedb.Client} EdgeDB client instance
 */
export const createClient = (dsn: string): edgedb.Client => {
  return edgedb.createHttpClient({
    tlsSecurity: 'insecure',
    dsn,
  });
};

// The code looks good overall. Here are a few minor suggestions:
// 1. Consider adding more specific error handling in the handleError function.
// 2. The createClient function uses 'insecure' tlsSecurity, which might not be suitable for production.
// 3. You might want to add error handling or connection validation in the createClient function.
// 4. Consider adding a function to close the EdgeDB client when it's no longer needed.