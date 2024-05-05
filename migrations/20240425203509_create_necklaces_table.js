exports.up = function(knex) {
    return knex.schema.createTable('necklaces', function(table) {
      table.increments('id').primary();
      table.string('description').notNullable();
      table.integer('price').notNullable();
      table.string('size').notNullable();
      table.string('color');
      table.string('gender').notNullable();
      table.string('imageKey').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('necklaces');
  };