const knex = require('../connection');

function getAllHousings(data) {
  return knex('housings')
    .limit(data.limit)
    .offset(data.offset)
    .orderBy(data.orderBy, data.order)
    .select('id', 'number', 'description', 'photos');
}

async function editHousing(data) {
    return knex('housings')
        .returning(['id','number','description','photos'])
        .where({ 'id' : data.id })
        .update(data);
}

function getHousing(data) {
  return knex('housings')
  .where({
    id : data.id
  }) 
}

function addHousing(data){
    return knex('housings')
        .insert(data)
        .returning(['id','number','description','photos'])
}

module.exports = {
  getAllHousings,
  editHousing,
  getHousing,
  addHousing
};
