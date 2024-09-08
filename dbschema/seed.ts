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
      `);
      console.log("Successfully deleted all existing actors and movies.");
    } catch (error) {
      console.error("Error deleting existing actors and movies:", error);
      throw error;
    }
  }

  // Call the function to delete existing data before inserting new records
  await deleteExistingActorsAndMovies();
  await client.execute(`
    insert Person { name := "Robert Downey Jr." };
    insert Person { name := "Scarlett Johansson" };
    insert Person { name := "Chris Evans" };
    insert Person { name := "Chris Hemsworth" };
    insert Person { name := "Mark Ruffalo" };
    insert Person { name := "Tom Holland" };
    insert Person { name := "Benedict Cumberbatch" };
    insert Person { name := "Chris Pratt" };
    insert Person { name := "Zoe Saldana" };
    insert Person { name := "Dave Bautista" };
    insert Person { name := "Leonardo DiCaprio" };
    insert Person { name := "Kate Winslet" };
    insert Person { name := "Brad Pitt" };
    insert Person { name := "Edward Norton" };
    insert Person { name := "Keanu Reeves" };
    insert Person { name := "Carrie-Anne Moss" };
    insert Person { name := "Tom Hanks" };
    insert Person { name := "Robin Wright" };
    insert Person { name := "Meryl Streep" };
    insert Person { name := "Anne Hathaway" };
    insert Person { name := "Johnny Depp" };
    insert Person { name := "Helena Bonham Carter" };
    insert Person { name := "Daniel Radcliffe" };
    insert Person { name := "Emma Watson" };
    insert Person { name := "Rupert Grint" };
    insert Person { name := "Samuel L. Jackson" };
    insert Person { name := "Uma Thurman" };
    insert Person { name := "John Travolta" };
    
    insert Movie {
      title := <str>$title1,
      actors := (
        select Person filter .name in {
          "Robert Downey Jr.",
          "Scarlett Johansson",
          "Chris Evans"
        }
      )
    };

    insert Movie {
      title := <str>$title2,
      actors := (
        select Person filter .name in {
          "Tom Holland",
          "Benedict Cumberbatch",
          "Robert Downey Jr."
        }
      )
    };

    insert Movie {
      title := <str>$title3,
      actors := (
        select Person filter .name in {
          "Chris Pratt",
          "Zoe Saldana",
          "Dave Bautista"
        }
      )
    };

    insert Movie {
      title := <str>$title4,
      actors := (
        select Person filter .name in {
          "Leonardo DiCaprio",
          "Kate Winslet"
        }
      )
    };

    insert Movie {
      title := <str>$title5,
      actors := (
        select Person filter .name in {
          "Brad Pitt",
          "Edward Norton"
        }
      )
    };

    insert Movie {
      title := <str>$title6,
      actors := (
        select Person filter .name in {
          "Keanu Reeves",
          "Carrie-Anne Moss"
        }
      )
    };

    insert Movie {
      title := <str>$title7,
      actors := (
        select Person filter .name in {
          "Tom Hanks",
          "Robin Wright"
        }
      )
    };

    insert Movie {
      title := <str>$title8,
      actors := (
        select Person filter .name in {
          "Will Smith",
          "Tommy Lee Jones"
        }
      )
    };

    insert Movie {
      title := <str>$title9,
      actors := (
        select Person filter .name in {
          "Harrison Ford",
          "Karen Allen"
        }
      )
    };

    insert Movie {
      title := <str>$title10,
      actors := (
        select Person filter .name in {
          "Meryl Streep",
          "Anne Hathaway"
        }
      )
    };

    insert Movie {
      title := <str>$title11,
      actors := (
        select Person filter .name in {
          "Johnny Depp",
          "Helena Bonham Carter"
        }
      )
    };

    insert Movie {
      title := <str>$title12,
      actors := (
        select Person filter .name in {
          "Daniel Radcliffe",
          "Emma Watson",
          "Rupert Grint"
        }
      )
    };

    insert Movie {
      title := <str>$title13,
      actors := (
        select Person filter .name in {
          "Samuel L. Jackson",
          "Uma Thurman",
          "John Travolta"
        }
      )
    };

    insert Movie {
      title := <str>$title14,
      actors := (
        select Person filter .name in {
          "Leonardo DiCaprio",
          "Tom Hardy"
        }
      )
    };

    insert Movie {
      title := <str>$title15,
      actors := (
        select Person filter .name in {
          "Robert Downey Jr.",
          "Chris Hemsworth",
          "Mark Ruffalo"
        }
      )
    };

    insert Movie {
      title := <str>$title16,
      actors := (
        select Person filter .name in {
          "Johnny Depp",
          "Orlando Bloom",
          "Keira Knightley"
        }
      )
    };

    insert Movie {
      title := <str>$title17,
      actors := (
        select Person filter .name in {
          "Keanu Reeves",
          "Laurence Fishburne"
        }
      )
    };

    insert Movie {
      title := <str>$title18,
      actors := (
        select Person filter .name in {
          "Tom Hanks",
          "Tim Allen"
        }
      )
    };

    insert Movie {
      title := <str>$title19,
      actors := (
        select Person filter .name in {
          "Brad Pitt",
          "Angelina Jolie"
        }
      )
    };
  `, { 
    title1: "The Avengers", 
    title2: "Spider-Man: Homecoming", 
    title3: "Guardians of the Galaxy",
    title4: "Titanic",
    title5: "Fight Club",
    title6: "The Matrix",
    title7: "Forrest Gump",
    title8: "Men in Black",
    title9: "Raiders of the Lost Ark",
    title10: "The Devil Wears Prada",
    title11: "Sweeney Todd: The Demon Barber of Fleet Street",
    title12: "Harry Potter and the Philosopher's Stone",
    title13: "Pulp Fiction",
    title14: "Inception",
    title15: "Avengers: Age of Ultron",
    title16: "Pirates of the Caribbean: The Curse of the Black Pearl",
    title17: "The Matrix Reloaded",
    title18: "Toy Story",
    title19: "Mr. & Mrs. Smith"
  });
}

main();