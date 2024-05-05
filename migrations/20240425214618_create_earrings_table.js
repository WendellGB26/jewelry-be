exports.up = function(knex) {
    return knex.schema.createTable('earrings', function(table) {
      table.increments('id').primary();
      table.string('description').notNullable();
      table.string('color');
      table.string('gender').notNullable();
      table.string('imageKey').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('earrings');
  };