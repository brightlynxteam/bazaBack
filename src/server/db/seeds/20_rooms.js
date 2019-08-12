exports.seed = function (knex, Promise) {
    return knex('rooms').del()
        .then(function () {
            return knex('rooms').insert([
                {
                    number: 1,
                    description: 'Однокомнатный номер для двух человек с одной двуспальной кроватью.',
                    active: true,
                    housing: 1,
                    capacity: 2
                },
                {
                    number: 2,
                    description: 'Однокомнатный номер для одного человека с одной кроватью.',
                    active: true,
                    housing: 1,
                    capacity: 1
                },
                {
                    number: 3,
                    description: 'Однокомнатный номер для четырех человек с одной двуспальной кроватью и двумя односпальными или с четыремя отдельными односпальными кроватями. ',
                    active: false,
                    housing: 1,
                    capacity: 4
                },
                {
                    number: 4,
                    description: 'Однокомнатный номер для четырех человек с одной двуспальной кроватью и двумя односпальными или с четыремя отдельными односпальными кроватями. ',
                    active: false,
                    housing: 2,
                    capacity: 4
                },
                {
                    number: 5,
                    description: 'Однокомнатный номер для двух человек с одной двуспальной кроватью.',
                    active: true,
                    housing: 3,
                    capacity: 2
                },
                {
                    number: 6,
                    description: 'Однокомнатный номер для двух человек с одной двуспальной кроватью.',
                    active: false,
                    housing: 3,
                    capacity: 2
                },
                {
                    number: 7,
                    description: 'Однокомнатный номер для трех человек с одной двуспальной кроватью и одной односпальной (EXB) или с тремя отдельными односпальными кроватями.',
                    active: true,
                    housing: 3,
                    capacity: 3
                },
                {
                    number: 8,
                    description: 'Однокомнатный номер для одного человека с одной кроватью.',
                    active: true,
                    housing: 2,
                    capacity: 1
                },
                {
                    number: 9,
                    description: 'Однокомнатный номер для двух человек с одной двуспальной кроватью.',
                    active: false,
                    housing: 3,
                    capacity: 2
                },
                {
                    number: 10,
                    description: 'Однокомнатный номер для четырех человек с одной двуспальной кроватью и двумя односпальными или с четыремя отдельными односпальными кроватями.',
                    active: false,
                    housing: 2,
                    capacity: 4
                },
            ]);
        });
};
