/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('drink_types', (table) => {
        table.increments('id').primary();
        table.string('type').notNullable();
    }).createTable('drinks', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.decimal('volume');
        table.decimal('price');
        table.decimal('alcohol');
        table.integer('year');
        table.string('description');
        table.integer('drink_type_id').references('id').inTable('drink_types');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('drink_types').dropTable('drinks');
};