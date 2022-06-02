/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('menus', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.integer('bar_id').references('id').inTable('bars');
    }).createTable('drinks_menus', (table) => {
        table.increments('id').primary();
        table.decimal('price').notNullable();
        table.integer('drink_id').references('id').inTable('drinks');
        table.integer('menu_id').references('id').inTable('menus');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('menus').dropTable('drinks_menus');
};
