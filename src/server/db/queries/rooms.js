const knex = require('../connection');

async function addRoom(data) {
    return knex('rooms')
        .returning(['id','number','description','active','housing', 'capacity'])
        .insert(data)
        .then(res => res[0]);
}

module.exports = {
    addRoom,
};
