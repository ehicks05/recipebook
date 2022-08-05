CREATE MIGRATION m1yheofyaga7xlsoarimdgujxxfsezi7kbbecgrocl2dstlqhjqmgq
    ONTO initial
{
  CREATE EXTENSION graphql VERSION '1.0';
  CREATE TYPE default::Ingredient {
      CREATE REQUIRED PROPERTY name -> std::str;
      CREATE REQUIRED PROPERTY quantity -> std::str;
      CREATE REQUIRED PROPERTY unit -> std::str;
  };
  CREATE TYPE default::Step {
      CREATE REQUIRED PROPERTY i -> std::int16;
      CREATE REQUIRED PROPERTY text -> std::str;
  };
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY auth_id -> std::uuid;
      CREATE REQUIRED PROPERTY displayName -> std::str;
  };
  CREATE TYPE default::Recipe {
      CREATE MULTI LINK ingredients -> default::Ingredient;
      CREATE REQUIRED LINK author -> default::User;
      CREATE MULTI LINK steps -> default::Step;
      CREATE REQUIRED PROPERTY course -> std::str;
      CREATE REQUIRED PROPERTY createdAt -> std::datetime;
      CREATE REQUIRED PROPERTY description -> std::str;
      CREATE REQUIRED PROPERTY difficulty -> std::int16;
      CREATE REQUIRED PROPERTY emoji -> std::str;
      CREATE REQUIRED PROPERTY name -> std::str;
      CREATE REQUIRED PROPERTY servings -> std::int16;
      CREATE REQUIRED PROPERTY totalTime -> std::duration;
      CREATE REQUIRED PROPERTY updatedAt -> std::datetime;
  };
};
