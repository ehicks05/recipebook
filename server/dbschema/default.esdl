using extension graphql;

module default {
  type Recipe {
    required property name -> str;
    required property emoji -> str;
    required property description -> str;
    required property totalTime -> duration;
    required property difficulty -> int16;
    required property servings -> int16;
    required property course -> str;
    required property createdAt -> datetime;
    required property updatedAt -> datetime;

    required link author -> User;
    multi link ingredients -> Ingredient;
    multi link steps -> Step;
  }

  type User {
    required property auth_id -> uuid;
    required property displayName -> str {
      constraint exclusive;
    };
  }

  type Ingredient {
    required property name -> str;
    required property quantity -> str;
    required property unit -> str;
  }

  type Step {
    required property i -> int16;
    required property text -> str;
  }
}
