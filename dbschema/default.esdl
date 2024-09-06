module default {
  type Movie {
    required property title -> str {
      constraint exclusive;
    };
    multi link actors -> Person;
  }

  type Person {
    required property name -> str {
      constraint exclusive;
    };
    multi link acted_in := .<actors[is Movie];
  }
}