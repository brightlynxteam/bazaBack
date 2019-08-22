const knex = require('../connection');

async function getAllRooms(data) {
    return knex('rooms')
        .limit(data.limit)
        .offset(data.offset)
        .orderBy(data.orderBy, data.order)
        .select('id','number','description','active','housing', 'capacity');
}

async function editRoom(data) {
    return knex('rooms')
        .returning(['id','number','description','active','housing', 'capacity'])
        .where({ 'id' : data.id })
        .update(data)
        .then(res => res[0]);
}

async function addRoom(data) {
    return knex('rooms')
        .returning(['id','number','description','active','housing', 'capacity'])
        .insert(data)
        .then(res => res[0]);
}

async function getOneRoom(data) {
  return knex('rooms')
    .where({ id: data.id })
    .select('id', 'number', 'description', 'active', 'housing', 'capacity');
};

module.exports = {
    getAllRooms,
    editRoom,
    addRoom,
    getOneRoom,
};
