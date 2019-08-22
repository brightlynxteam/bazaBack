const {onUpdateTrigger} = require('../../../../knexfile');
exports.up = function (knex, Promise) {

    return knex.schema
        .createTable('rooms', function (table) {
            table.increments('id').primary();
            table.integer('number');
            table.text('description');
            table.boolean('active');
            table.integer('housing')
                .references('id')
                .inTable('housings')
                .index();
            table.integer('capacity');
        });
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTable("rooms");
};
