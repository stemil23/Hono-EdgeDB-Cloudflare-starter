CREATE MIGRATION m1szrsbwuqw7jh7imtxdlmgw6gkmqu326kfg6ffpjmul5yhzgjtabq
    ONTO m1qkgfjhrbgjpwenk2xvimzb2s77pzjazpwyzbxbjnvwn3codbvdpa
{
  CREATE TYPE default::MovieWithActorsText {
      CREATE REQUIRED PROPERTY actors_text: array<std::str>;
      CREATE REQUIRED PROPERTY title: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
