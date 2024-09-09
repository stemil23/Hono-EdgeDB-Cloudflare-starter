CREATE MIGRATION m1ykhlulapsykvw6wz2u6t3cvpe2i73eb6eok47urgpxwshyfvoalq
    ONTO m1nz6dbv3pbb6ea5lkaekiyqjkqm5vq2kyt5izo5mfffuqdwwhdofq
{
  ALTER TYPE default::Movie {
      CREATE PROPERTY description := (.title);
  };
};
