const {onUpdateTrigger} = require('../../../../knexfile');
exports.up = function (knex, Promise) {

    return knex.schema
        .createTable('pages_categories', function (table) {
            table.increments('id').primary();
            table.string('name').unique();
        });
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTable("pages_categories");
};
