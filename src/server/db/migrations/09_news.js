const {onUpdateTrigger} = require('../../../../knexfile');
exports.up = function (knex, Promise) {

    return knex.schema
        .createTable('pages', function (table) {
            table.increments('id').primary();
            table.string('title', 255).notNullable();
            table.text('description');
            table.text('content').notNullable();
            table.string('main_image', 255);
            table.specificType('content_images', 'VARCHAR(255) []');
            table.boolean('repost').defaultTo(false).notNullable();
            table.integer('period').defaultTo(null);
            table.integer('created_at').defaultTo(knex.raw('extract(epoch from now())'));
            table.integer('updated_at').defaultTo(knex.raw('extract(epoch from now())'));
        })
        .then(() => knex.raw(onUpdateTrigger('pages')));
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTable("pages");
};
