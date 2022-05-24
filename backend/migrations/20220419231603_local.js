exports.up = function (knex) {
    return knex.schema.createTable('locals', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();;
        table.integer('menuId');
        table.integer('locationId');
        table.integer('contactId');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('locals');
};
