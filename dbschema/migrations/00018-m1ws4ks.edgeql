CREATE MIGRATION m1ws4kskbxsm3zhg6avdaalzsjpluvxca4wod5poteoqahe4wz3rla
    ONTO m1ynz7wh4g4s74ywn3yufyx43r3dtugj7yzc5y6qpu2nith7etis7q
{
  ALTER TYPE default::Movie {
      CREATE TRIGGER mwa_delete
          AFTER DELETE 
          FOR EACH DO (DELETE
              default::MovieWithActorsTxt
          FILTER
              (.title = __old__.title)
          );
  };
};
