const knex = require('../connection');

function editReservation(data) {
    return knex('reservation')
        .returning(['id', 'room', 'user', 'start_date', 'end_date', 'bail', 'paid', 'active'])
        .where({'id': data.id})
        .update(data)
        .then(res => res[0]);
}

function addReservation(data) {
    return knex('reservation')
        .insert(data)
        .returning('*');
}

function getFreeRooms(data) {
    return knex('rooms')
        .select('*')
        .whereRaw(`id not in ( 
            select room 
            from reservation res 
            where res.start_date <= ${data.startDate} and res.end_date > ${data.startDate} 
                or res.start_date < ${data.endDate} and res.end_date >= ${data.endDate} 
            )`
        );
}

function getRoomReservations(id) {
    return knex('reservation')
        .select('start_date', 'end_date')
        .where({
            room: id
        });
}

module.exports = {
    addReservation,
    editReservation,
    getFreeRooms,
    getRoomReservations
};
