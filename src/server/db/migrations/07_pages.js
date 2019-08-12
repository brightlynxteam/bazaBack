const { onUpdateTrigger } = require('../../../../knexfile');
exports.up = function(knex, Promise) {

    return knex.schema
        .createTable('pages', function (table) {
            table.increments('id').primary();
            table.string('topic', 255).unique();
            table.text('text').notNullable();
            table.integer('created_at').defaultTo(knex.raw('extract(epoch from now())'));
            table.integer('updated_at').defaultTo(knex.raw('extract(epoch from now())'));
        })
        .then(() => knex.raw(onUpdateTrigger('pages')));
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable("pages");
};
