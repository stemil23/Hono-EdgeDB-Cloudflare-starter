CREATE MIGRATION m1vg2zdaw2n33vhgacqqdr7myeyh6d4rf42g3j2y4ao4yc6iwheuga
    ONTO m1at3l6yv4ahlc4zqpemls37pll6uli655reytp5ov7eujj2d3besa
{
  ALTER TYPE default::Movie {
      ALTER PROPERTY actors_list {
          USING (FOR actor IN .actors
          UNION 
              actor.name);
      };
  };
};
