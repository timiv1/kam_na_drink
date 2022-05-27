/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
    }).createTable('drinks_users', (table) => {
        table.increments('id').primary();
        table.integer('drink_id').references('id').inTable('drinks').notNullable();
        table.integer('user_id').references('id').inTable('users').notNullable();
    }).createTable('bars_users', (table) => {
        table.increments('id').primary();
        table.integer('bar_id').references('id').inTable('bars').notNullable();
        table.integer('user_id').references('id').inTable('users').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('users').dropTable('drinks_users');
};
