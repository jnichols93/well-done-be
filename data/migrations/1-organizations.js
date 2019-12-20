exports.up = function(knex) {
  return knex.schema.createTable("organizations", column => {
    column.increments();
    column.string("org_name");
    column.string("headquarter_city");
    column.string("origin_country");
    column.integer("pump_id")
    .references("id")
    .inTable("pumps")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
    column.integer("org_users")
    .references("id")
    .inTable("accounts")
    .onDelete("CASCADE")
    .onUpdate("CASCADE")
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("organizations");
};