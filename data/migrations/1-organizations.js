exports.up = function(knex) {
  return knex.schema.createTable("organizations", column => {
    column.increments();
    column.string("org_name");
    column.string("headquarter_city");
    column.integer("org_admin")
    .unsigned()
    .notNullable()
    .references("id")
    .inTable("accounts")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
    column.string("org_users");
    column.string("pumps_owned");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("organizations");
};