const knex = require('../connection');

async function editHousing(data) {
    return knex('housings')
        .returning(['id','number','description','photos'])
        .where({ 'id' : data.id })
        .update(data);
}

module.exports = {
    editHousing,
};
