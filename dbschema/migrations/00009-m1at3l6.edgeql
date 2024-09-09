CREATE MIGRATION m1at3l6yv4ahlc4zqpemls37pll6uli655reytp5ov7eujj2d3besa
    ONTO m1ykhlulapsykvw6wz2u6t3cvpe2i73eb6eok47urgpxwshyfvoalq
{
  ALTER TYPE default::Movie {
      CREATE PROPERTY actors_list := (.actors.name);
  };
};
