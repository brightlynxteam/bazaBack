const knex = require('../connection');

function addPage(data) {
  return knex('pages')
    .insert(data)
    .returning(['id', 'topic', 'text', 'created_at', 'updated_at']);
}

module.exports = {
  addPage
};
