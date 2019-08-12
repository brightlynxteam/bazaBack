const knex = require('../connection');

function getAllPages(data) {
  return knex('pages')
    .orderBy(data.orderBy, data.order)
    .offset(data.offset)
    .limit(data.limit)
    .select('id', 'topic', 'text', 'created_at', 'updated_at');
}

module.exports = {
  getAllPages
};
