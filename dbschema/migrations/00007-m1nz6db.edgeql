CREATE MIGRATION m1nz6dbv3pbb6ea5lkaekiyqjkqm5vq2kyt5izo5mfffuqdwwhdofq
    ONTO m17r3aoswyqegcr7h2xu7xfvsrznatqd7kbnexd2jastaikl72m6na
{
  ALTER TYPE default::Movie {
      DROP INDEX ext::ai::index(embedding_model := 'text-embedding-ada-002') ON (.title);
  };
  ALTER TYPE default::Movie {
      CREATE DEFERRED INDEX ext::ai::index(embedding_model := 'mistral-embed') ON (.title);
  };
  ALTER TYPE default::Person {
      DROP INDEX ext::ai::index(embedding_model := 'text-embedding-ada-002') ON (.name);
  };
  ALTER TYPE default::Person {
      CREATE DEFERRED INDEX ext::ai::index(embedding_model := 'mistral-embed') ON (.name);
  };
};
