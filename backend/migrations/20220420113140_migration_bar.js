/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("bars", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("contact_id").references("id").inTable("contacts");
    table.integer("location_id").references("id").inTable("locations");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("bars");
};
