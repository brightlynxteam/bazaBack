exports.seed = function (knex, Promise) {
    return knex('pages_categories').del()
        .then(function () {
            return knex('pages_categories').insert([
                {
                    name: 'SPA-процедуры'
                },
                {
                    name: 'Развлечения'
                }
            ]);
        });
};
