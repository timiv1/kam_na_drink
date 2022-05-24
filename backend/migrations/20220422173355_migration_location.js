/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("locations", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("street").notNullable();
    table.string("city").notNullable();
    table.integer("post_number").notNullable();
    table.string("country").notNullable();
    table.string("GPS_coordinates").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("locations");
};
