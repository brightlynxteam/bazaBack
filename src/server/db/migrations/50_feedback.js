exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('feedback', function (table) {
            table.increments('id').primary();
            table.string('name');
            table.string('email');
            table.string('phone');
            table.text('message');
        });
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTable('feedback');
};