using extension ai;

module default {
  # Movie type with multi-link to Person and trigger to update MovieWithActorsText
  type Movie {
    required property title -> str {
      constraint exclusive;
    };

    # Multi-link to associate multiple actors with a movie
    multi link actors -> Person;

    # Trigger to insert into MovieWithActorsText after a Movie insert
    trigger mwa_insert after insert for each do (
      INSERT MovieWithActorsTxt {
        title := __new__.title,
        actors := (
          SELECT array_join(
            array_agg((SELECT __new__.actors.name)), ', '
          )
        )
      }
    );
  }

  # Person type with exclusive name property and computed link to movies
  type Person {
    required property name -> str {
      constraint exclusive;
    };

    # Computed link to movies where the person acted
    multi link acted_in := .<actors[is Movie];
  }

  # Type to store denormalized movie data with a comma-separated list of actors as text
  type MovieWithActorsTxt {
     property title -> str {
      constraint exclusive;
    };

    # Property to store a comma-separated list of actor names
     property actors -> str;

    # Deferred AI index on concatenated title and actors properties using 'mistral-embed'
    deferred index ext::ai::index(embedding_model := 'mistral-embed')
      on (.title ++ ' ' ++ .actors);
  }
}