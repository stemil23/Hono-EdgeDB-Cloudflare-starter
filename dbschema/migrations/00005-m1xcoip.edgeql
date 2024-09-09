CREATE MIGRATION m1xcoip3mv5a4k4lujesrnxurs6bwfjdghpwzp5gic6oyppqwwcapa
    ONTO m1nbhswkzangzgnvonj2wgjjzoyy2zltz7lw7zc2ri6lf34pasmwna
{
  ALTER TYPE default::Movie {
      CREATE DEFERRED INDEX ext::ai::index(embedding_model := 'text-embedding-3-small') ON (.title);
  };
  ALTER TYPE default::Person {
      CREATE DEFERRED INDEX ext::ai::index(embedding_model := 'text-embedding-3-small') ON (.name);
  };
};
