const knex = require('../connection');

async function editRoom(data) {
    return knex('rooms')
        .returning(['id','number','description','active','housing', 'capacity'])
        .where({ 'id' : data.id })
        .update(data)
        .then(res => res[0]);
}

module.exports = {
    editRoom,
};
