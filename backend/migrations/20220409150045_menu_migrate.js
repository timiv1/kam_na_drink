
exports.up = function (knex) {
    return knex.schema.createTable('menus', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
    }).createTable('drinks_menus', (table) => {
        table.increments('id').primary();
        table.decimal('price').notNullable();
        table.integer('drink_id').references('id').inTable('drinks');
        table.integer('menu_id').references('id').inTable('menus');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('menus').dropTable('drinks_menus');
};
