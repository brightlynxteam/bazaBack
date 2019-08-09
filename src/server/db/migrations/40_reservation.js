exports.up = (knex, Promise) => {
    return knex.schema.createTable('reservation', (table) => {
        table.increments('id').primary();
        table.integer('room')
            .references('id')
            .inTable('rooms')
            .index()
            .notNullable();
        table.integer('user')
            .references('id')
            .inTable('users')
            .index()
            .notNullable();
        table.bigInteger('start_date').notNullable();
        table.bigInteger('end_date').notNullable();
        table.boolean('bail').notNullable();
        table.boolean('paid').notNullable();
        table.boolean('active').notNullable();
    })
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('reservation')
};