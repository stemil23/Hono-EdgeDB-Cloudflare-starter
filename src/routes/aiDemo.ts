import { Context } from 'hono';
import { edgedb } from '@db/imports';
import e from "../../dbschema/edgeql-js";

interface QuestionRequest {
  question: string;
}

export function serveAiDemo(c: Context) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>EdgeDB AI Demo</title>
      <script src="https://unpkg.com/htmx.org@1.9.6"></script>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        form { margin-bottom: 20px; }
        input[type="text"] { width: 70%; padding: 5px; }
        button { padding: 5px 10px; }
        #result { border: 1px solid #ccc; padding: 10px; white-space: pre-wrap; }
      </style>
    </head>
    <body>
      <h1>EdgeDB AI Demo</h1>
      <form hx-post="/ai/ask" hx-target="#result">
        <input type="text" name="question" placeholder="Ask a question about movies or actors" required>
        <button type="submit">Ask</button>
      </form>
      <div id="result"></div>
    </body>
    </html>
  `;
  return c.html(html);
}

export async function askAboutMoviesOrActors(c: Context<{ Bindings: { EDGEDB_DSN: string } }>) {
  try {
    const body = await c.req.parseBody();
    const question = body.question as string;

    if (!question) {
      return c.html('<p style="color: red;">Question is required</p>');
    }

    const client = edgedb.createClient({
      dsn: c.env.EDGEDB_DSN,
    });

    const result = await e.select({
      answer: e.ai.generateText(`
        Given the following question about movies or actors:
        "${question}"
        
        Provide a concise answer based on the information in our database.
        If the question is about a specific movie or actor, try to include relevant details.
        If the information is not in our database, provide a general response based on common knowledge.
      `),
      relevant_movies: e.Movie.select({
        title: true,
        description: true,
      }).order_by(e.function.edgeql_ai.cosine_similarity(
        e.Movie.embedding,
        e.function.edgeql_ai.embed(question)
      )).limit(2),
      relevant_persons: e.Person.select({
        name: true,
        bio: true,
      }).order_by(e.function.edgeql_ai.cosine_similarity(
        e.Person.embedding,
        e.function.edgeql_ai.embed(question)
      )).limit(2),
    }).run(client);

    const responseHtml = `
      <h2>Answer:</h2>
      <p>${result.answer}</p>
      <h3>Relevant Movies:</h3>
      <ul>
        ${result.relevant_movies.map(movie => `<li><strong>${movie.title}</strong>: ${movie.description}</li>`).join('')}
      </ul>
      <h3>Relevant Persons:</h3>
      <ul>
        ${result.relevant_persons.map(person => `<li><strong>${person.name}</strong>: ${person.bio}</li>`).join('')}
      </ul>
    `;

    return c.html(responseHtml);
  } catch (error) {
    console.error('Error processing question:', error);
    return c.html('<p style="color: red;">Failed to process the question</p>');
  }
}