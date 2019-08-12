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
        table.boolean('bail').defaultTo('false').notNullable();
        table.boolean('paid').defaultTo('false').notNullable();
        table.boolean('active').defaultTo('false').notNullable();
    })
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('reservation')
};