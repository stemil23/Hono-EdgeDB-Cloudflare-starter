CREATE MIGRATION m1ynz7wh4g4s74ywn3yufyx43r3dtugj7yzc5y6qpu2nith7etis7q
    ONTO m1zfva5ex4tuynxidynr5a7mizdfajv566qkgozwifie6sf4u7pgva
{
  ALTER TYPE default::Movie {
      DROP INDEX ext::ai::index(embedding_model := 'mistral-embed') ON (.title);
  };
  CREATE TYPE default::MovieWithActorsTxt {
      CREATE PROPERTY actors: std::str;
      CREATE PROPERTY title: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE DEFERRED INDEX ext::ai::index(embedding_model := 'mistral-embed') ON (((.title ++ ' ') ++ .actors));
  };
  ALTER TYPE default::Movie {
      ALTER TRIGGER mwa_insert USING (INSERT
          default::MovieWithActorsTxt
          {
              title := __new__.title,
              actors := (SELECT
                  std::array_join(std::array_agg((SELECT
                      __new__.actors.name
                  )), ', ')
              )
          });
  };
  DROP TYPE default::MovieWithActorsText;
  ALTER TYPE default::Person {
      DROP INDEX ext::ai::index(embedding_model := 'mistral-embed') ON (.name);
  };
};
