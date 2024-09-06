CREATE MIGRATION m1s2qpe4nrl5wouqfzyigc2q6txhqprsrjgmk5tgkklxniapeebdtq
    ONTO m16b2bfrvofcvl7c4qnzgt2zpvr3a7lwmd4tptuhpotqinpz6ospna
{
  ALTER TYPE default::Person {
      CREATE MULTI LINK acted_in := (.<actors[IS default::Movie]);
  };
};
