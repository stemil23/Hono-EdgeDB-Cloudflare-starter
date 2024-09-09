CREATE MIGRATION m1zfva5ex4tuynxidynr5a7mizdfajv566qkgozwifie6sf4u7pgva
    ONTO m1uj26pp5g2sgktnu4tmslpjpum45gstdn2oqeyiyd2rjp4nje2z4q
{
  ALTER TYPE default::MovieWithActorsText {
      CREATE PROPERTY actors: array<std::str>;
  };
  ALTER TYPE default::Movie {
      ALTER TRIGGER mwa_insert USING (INSERT
          default::MovieWithActorsText
          {
              title := __new__.title,
              actors := (SELECT
                  std::array_agg((SELECT
                      __new__.actors.name
                  ))
              )
          });
  };
};
