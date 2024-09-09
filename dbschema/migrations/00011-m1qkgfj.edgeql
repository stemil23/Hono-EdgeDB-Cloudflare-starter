CREATE MIGRATION m1qkgfjhrbgjpwenk2xvimzb2s77pzjazpwyzbxbjnvwn3codbvdpa
    ONTO m1vg2zdaw2n33vhgacqqdr7myeyh6d4rf42g3j2y4ao4yc6iwheuga
{
  ALTER TYPE default::Movie {
      DROP PROPERTY actors_list;
      DROP PROPERTY description;
  };
};
