const knex = require('../connection');

function addReservation(data){
    return knex('reservation')
        .insert(data)
        .returning('*');
}

module.exports = {
    addReservation,
};