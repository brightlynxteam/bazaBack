const knex = require('../connection');

function getAllHousings(data) {
  return knex('housings')
    .limit(data.limit)
    .offset(data.offset)
    .orderBy(data.orderBy, data.order)
    .select('id', 'number', 'description', 'photos');
}

module.exports = {
  getAllHousings
};
