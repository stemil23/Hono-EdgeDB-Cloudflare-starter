CREATE MIGRATION m1lshtqicvhqdy2ciu4lg5nxe7pjs4jjljan7sewqklincqs6adc3q
    ONTO m16wysmwshx4bfshhx5wrrfsyj6cokwocfubgogurovp7qxgmseiha
{
  CREATE TYPE default::MovieWithActorsText {
      CREATE REQUIRED PROPERTY title: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
