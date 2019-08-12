const knex = require('../connection');

function addPage(data) {
  return knex('pages')
    .insert(data)
    .returning(['id', 'topic', 'text', 'created_at', 'updated_at']);
}

function getAllPages(data) {
  return knex('pages')
    .orderBy(data.orderBy, data.order)
    .offset(data.offset)
    .limit(data.limit)
    .select('id', 'topic', 'text', 'created_at', 'updated_at');
}

module.exports = {
  getAllPages,
  addPage
};
