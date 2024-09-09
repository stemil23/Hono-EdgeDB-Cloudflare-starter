import * as edgedb from "edgedb";

const client = edgedb.createClient();

async function main() {
  /**
   * Deletes all existing actors and movies from the database.
   * @returns {Promise<void>}
   */
  async function deleteExistingActorsAndMovies(): Promise<void> {
    try {
      await client.execute(`
        delete Movie;
        delete Person;
        delete MovieWithActorsText;
      `);
      console.log("Successfully deleted all existing actors and movies.");
    } catch (error) {
      console.error("Error deleting existing actors and movies:", error);
      throw error;
    }
  }

  // Call the function to delete existing data before inserting new records
  await deleteExistingActorsAndMovies();
  
}

main();