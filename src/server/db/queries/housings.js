const knex = require('../connection');

function getHousing(id) {
  return knex('housings')
  .where('id', id);
}

module.exports = {
  getHousing,
};
