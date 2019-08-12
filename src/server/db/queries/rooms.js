const knex = require('../connection');

async function addRoom(data) {
    return knex('rooms')
        .returning(['id','number','description','active','housing', 'capacity'])
        .insert(data);
}

module.exports = {
    addRoom,
};
