/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema
    .createTable("work_times", (table) => {
      table.increments("id").primary();
      table.string("day").notNullable();
      table.string("from").notNullable();
      table.string("to").notNullable();
    })
    .createTable("work_times_bars", (table) => {
      table.increments("id").primary();
      table.integer("bar_id").references("id").inTable("bars");
      table.integer("work_time_id").references("id").inTable("work_times");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("work_times").dropTable("work_times_bars");
};
