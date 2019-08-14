const knex = require('../connection');

function getHousing(data) {
  return knex('housings')
  .where({
    id : data.id
  }) 
}

module.exports = {
  getHousing,
};
