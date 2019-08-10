const knex = require('../connection');

async function getAllRooms(data) {
    return knex('rooms')
        .limit(data.limit)
        .offset(data.offset)
        .orderBy(data.orderBy, data.order)
        .select('id','number','description','active','housing', 'capacity');
}

module.exports = {
    getAllRooms,
};
