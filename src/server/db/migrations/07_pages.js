const {onUpdateTrigger} = require('../../../../knexfile');
exports.up = function (knex, Promise) {

    return knex.schema
        .createTable('pages', function (table) {
            table.increments('id').primary();
            table.string('text_id', 255).unique();
            table.string('type', 255).notNullable();
            table.integer('category').references('id').inTable('pages_categories').defaultTo(null);
            table.string('title', 255).notNullable();
            table.text('description').notNullable();
            table.text('content').notNullable();
            table.string('main_image', 255).defaultTo(null);
            table.specificType('content_images', 'VARCHAR(255) []').defaultTo(null);
            table.boolean('active').defaultTo(true).notNullable();
            table.integer('created_at').defaultTo(knex.raw('extract(epoch from now())'));
            table.integer('updated_at').defaultTo(knex.raw('extract(epoch from now())'));
        })
        .then(() => knex.raw(onUpdateTrigger('pages')));
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTable("pages");
};
