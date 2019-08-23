const {onUpdateTrigger} = require('../../../../knexfile');
exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('housings', function (table) {
            table.increments('id').primary();
            table.integer('number');
            table.text('description');
            table.specificType('photos', 'text ARRAY')
        });
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTable("housings");
};
