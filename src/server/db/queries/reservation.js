const knex = require('../connection');

function editReservation(data) {
    return knex('reservation')
        .returning(['id', 'room', 'user', 'start_date', 'end_date', 'bail', 'paid', 'active'])
        .where({'id': data.id})
        .update(data);
}

module.exports = {
    editReservation,
};