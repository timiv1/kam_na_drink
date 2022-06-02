/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("locations", (table) => {
    table.increments("id").primary();
    table.string("street").notNullable();
    table.string("city").notNullable();
    table.integer("post_number").notNullable();
    table.string("country").notNullable();
    table.integer("long").notNullable();
    table.integer("lat").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("locations");
};
