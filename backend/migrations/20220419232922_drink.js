exports.up = function (knex) {
    return knex.schema.createTable('drinks', (table) => {
        table.increments('id').primary();
        table.string('title');
        table.decimal('price');
        table.decimal('netoAmount');
        table.integer('alcoholPercentage');
        table.integer('year');
        table.string('ingredients');
        table.integer('originId');
        table.integer('typeOfDrinkId');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('locals');
};