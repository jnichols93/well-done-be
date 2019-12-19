exports.up = function(knex) {
  return knex.schema.createTable("organizations", column => {
    column.increments();
    column.string("org_name");
    column.string("headquarter_city");
    column.string("origin_country");
    column.integer("org_admin");
    column.integer("org_users")
      .references("accounts.id")
      .inTable("accounts")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("organizations");
};