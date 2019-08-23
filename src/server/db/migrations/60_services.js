exports.up = function (knex, Promise) {

    return knex.schema
        .createTable('services', function (table) {
            table.increments('id').primary();
            table.string('name', 255).notNullable();
            table.text('description').notNullable();
            table.string('price', 255).notNullable();
            table.text('info').notNullable();
            table.boolean('active').notNullable();
        })
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTable("services");
};
