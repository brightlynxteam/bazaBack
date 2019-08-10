const knex = require('../connection');

function addHousing(data){
    return knex('housings')
        .insert(data)
        .returning(['id','number','description','photos'])
}

module.exports = {
    addHousing
}