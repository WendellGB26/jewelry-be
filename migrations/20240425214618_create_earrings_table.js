exports.up = function(knex) {
    return knex.schema.createTable('earrings', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.integer('price').notNullable();
      table.string('color');
      table.string('gender').notNullable();
      table.string('type').notNullable();
      table.string('imagekey').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('earrings');
  };