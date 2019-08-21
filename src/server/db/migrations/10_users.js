const { onUpdateTrigger } = require('../../../../knexfile');
exports.up = function(knex, Promise) {


    return knex.schema
        .createTable('users', function (table) {
            table.increments('id').primary();
            table.string('email', 255).unique();
            table.string('phone_number', 255).unique();
            table.string('password', 255).notNullable();
            table.string('first_name', 255).notNullable();
            table.string('second_name', 255).notNullable();
            table.string('refresh_token', 255).defaultTo('').notNullable();
            table.boolean('is_admin').defaultTo(false);
            table.integer('created_at').defaultTo(knex.raw('extract(epoch from now())'));
            table.integer('updated_at').defaultTo(knex.raw('extract(epoch from now())'));
        })
        .then(() => knex.raw(onUpdateTrigger('users')));
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable("users");
};
