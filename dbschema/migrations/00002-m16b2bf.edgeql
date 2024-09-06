CREATE MIGRATION m16b2bfrvofcvl7c4qnzgt2zpvr3a7lwmd4tptuhpotqinpz6ospna
    ONTO m1eyguovjnuvvepgjdh5rhhwm54obpo7no456jx6meod6rgm5bofoq
{
  ALTER TYPE default::Person {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
