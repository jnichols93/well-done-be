exports.up = function(knex) {
  return knex.schema.createTable("organizations", column => {
    column.increments();
    column.string("org_name");
    column.string("headquarter_city");
    column.string("origin_country");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("organizations");
};