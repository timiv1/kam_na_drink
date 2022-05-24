exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('lastName').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
    }).createTable('drinks_users', (table) => {
        table.increments('id').primary();
        table.integer('drinkId').references('id').inTable('drinks').notNullable();;
        table.integer('userId').references('id').inTable('users').notNullable();;
    }).createTable('locals_users', (table) => {
        table.increments('id').primary();
        table.integer('localId').references('id').inTable('locals').notNullable();;
        table.integer('userId').references('id').inTable('users').notNullable();;
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users').dropTable('drinks_users');
};
