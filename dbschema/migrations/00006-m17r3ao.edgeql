CREATE MIGRATION m17r3aoswyqegcr7h2xu7xfvsrznatqd7kbnexd2jastaikl72m6na
    ONTO m1xcoip3mv5a4k4lujesrnxurs6bwfjdghpwzp5gic6oyppqwwcapa
{
  ALTER TYPE default::Movie {
      DROP INDEX ext::ai::index(embedding_model := 'text-embedding-3-small') ON (.title);
  };
  ALTER TYPE default::Movie {
      CREATE DEFERRED INDEX ext::ai::index(embedding_model := 'text-embedding-ada-002') ON (.title);
  };
  ALTER TYPE default::Person {
      DROP INDEX ext::ai::index(embedding_model := 'text-embedding-3-small') ON (.name);
  };
  ALTER TYPE default::Person {
      CREATE DEFERRED INDEX ext::ai::index(embedding_model := 'text-embedding-ada-002') ON (.name);
  };
};
