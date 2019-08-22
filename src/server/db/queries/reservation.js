const knex = require('../connection');

function editReservation(data) {
    return knex('reservation')
        .returning(['id', 'room', 'user', 'start_date', 'end_date', 'bail', 'paid', 'active'])
        .where({'id': data.id})
        .update(data)
        .then(res => res[0]);
}

module.exports = {
function addReservation(data){
    return knex('reservation')
        .insert(data)
        .returning('*');
}

module.exports = {
    addReservation,
    editReservation,
};