# EdgeDB, Hono, and Cloudflare Project

This project uses EdgeDB as the database, Hono as the web framework, and Cloudflare for deployment and edge computing capabilities.

- https://hono.dev
- https://docs.edgedb.com/libraries/js
- https://developers.cloudflare.com/workers/

## Prerequisites

- Node.js
- EdgeDB 
- Cloudflare account (for deployment)

## Setup

1. Clone the repository:
   ```
   git clone [your-repository-url]
   cd [your-project-directory]
   ```

2. Create a `.dev.vars` file in the project root and add your EdgeDB DSN:
   ```
   EDGEDB_DSN=edgedb://edgedb:XCf58cS3v2ftZ6AUyj14hRji@localhost:10701/main
   ```

   You can find your EdgeDB DSN by running:
   ```
   edgedb instance credentials --insecure-dsn
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up Cloudflare:
   - Create a Cloudflare account if you don't have one
   - Install the Cloudflare Wrangler CLI:
     ```
     npm install -g wrangler
     ```
   - Authenticate with Cloudflare:
     ```
     wrangler login
     ```

## Development

To run the project in development mode:

```
npm run dev
```

## Deployment

To deploy the project:

```
npm run deploy
```
