exports.up = function(knex) {
  return knex.schema.createTable("accounts", column => {
    column.increments();
    column
      .integer("org_id")
      .unsigned()
      .references("organizations.id")
      .inTable("organizations")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT");
    column
    .string("first_name").notNullable();
    column
    .string("last_name").notNullable();
    column
      .string("email_address")
      .notNullable()
      .unique();
    column
    .string("password").notNullable();
    column
    .string("mobile_number");
    column
    .string("role").notNullable();
    column
    .timestamp('created_at').defaultTo(knex.fn.now)

  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("accounts");
};