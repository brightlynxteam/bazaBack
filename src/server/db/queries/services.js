const knex = require('../connection');

function getAllServices(data) {
  return knex('services')
    .limit(data.limit)
    .offset(data.offset)
    .orderBy(data.orderBy, data.order)
    .select('id', 'name', 'description', 'price', 'info');
}

module.exports = {
  getAllServices
};
