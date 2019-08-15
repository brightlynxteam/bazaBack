exports.seed = (knex, Promise) => {
    return knex('reservation').del()
        .then(() => {
            return knex('reservation').insert({
                room: 1,
                user: 1,
                start_date: 1567674000000,
                end_date: 1568365200000,
                bail: true,
                paid: false,
                active: false
            });
        })
        .then(() => {
            return knex('reservation').insert({
                room: 2,
                user: 2,
                start_date: 1567414800000,
                end_date: 1568019600000,
                bail: false,
                paid: true,
                active: false
            });
        })
        .then(() => {
            return knex('reservation').insert({
                room: 3,
                user: 3,
                start_date: 1565427600000,
                end_date: 1565946000000,
                bail: true,
                paid: false,
                active: false
            });
        })
        .then(() => {
            return knex('reservation').insert({
                room: 4,
                user: 1,
                start_date: 1564995600000,
                end_date: 1565600400000,
                bail: false,
                paid: true,
                active: true
            });
        })
        .then(() => {
            return knex('reservation').insert({
                room: 5,
                user: 2,
                start_date: 1564736400000,
                end_date: 1565341200000,
                bail: true,
                paid: false,
                active: true
            });
        })
        .then(() => {
            return knex('reservation').insert({
                room: 6,
                user: 3,
                start_date: 1570611600000,
                end_date: 1571475600000,
                bail: false,
                paid: true,
                active: false
            });
        })
        .then(() => {
            return knex('reservation').insert({
                room: 7,
                user: 1,
                start_date: 1570784400000,
                end_date: 1571302800000,
                bail: true,
                paid: false,
                active: false
            });
        })
        .then(() => {
            return knex('reservation').insert({
                room: 8,
                user: 2,
                start_date: 1573808400000,
                end_date: 1574240400000,
                bail: false,
                paid: true,
                active: false
            });
        })
        .then(() => {
            return knex('reservation').insert({
                room: 9,
                user: 3,
                start_date: 1572685200000,
                end_date: 1573117200000,

                //поля bail, paid и active по умолчанию установятся в false
            });
        })
        .then(() => {
            return knex('reservation').insert({
                room: 10,
                user: 1,
                start_date: 1567328400000,
                end_date: 1567760400000,

                //поля bail, paid и active по умолчанию установятся в false
            });
        })
};