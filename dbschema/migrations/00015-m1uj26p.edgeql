CREATE MIGRATION m1uj26pp5g2sgktnu4tmslpjpum45gstdn2oqeyiyd2rjp4nje2z4q
    ONTO m1lshtqicvhqdy2ciu4lg5nxe7pjs4jjljan7sewqklincqs6adc3q
{
  ALTER TYPE default::Movie {
      CREATE TRIGGER mwa_insert
          AFTER INSERT 
          FOR EACH DO (INSERT
              default::MovieWithActorsText
              {
                  title := __new__.title
              });
  };
};
