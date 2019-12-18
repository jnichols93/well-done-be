exports.up = function(knex) {
  return knex.schema.createTable("organizations", column => {
    column.increments();
    column.string("org_name");
    column.string("headquarter_city");
    column.string("origin_country");
    column.integer("org_admin")
    .unsigned()
    .references("id")
    .inTable("accounts")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
    column.integer("org_users")
    .unsigned()
    .references("id")
    .inTable("accounts")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
    column.integer("pumps_owned")
    .unsigned()
    .references("id")
    .inTable("pumps")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
    ;
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("organizations");
};