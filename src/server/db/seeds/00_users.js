exports.seed = function(knex, Promise) {
    return knex('users').del()
        .then(function () {
            return knex('users').insert([
                {
                    email: 'user1@email.com',
                    phone_number: '89299271685',
                    password: 'password',
                    first_name: 'Карп',
                    second_name: 'Смирнов'
                },
                {
                    email: 'user2@email.com',
                    phone_number: '88005552352',
                    password: 'password',
                    first_name: 'Владимир',
                    second_name: 'Чуриков'
                },
                {
                    email: 'user3@email.com',
                    phone_number: '89333333333',
                    password: 'password',
                    first_name: 'Павел',
                    second_name: 'Цыпиков'
                }
            ]);
        });
};
