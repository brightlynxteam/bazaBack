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

function getPage(id) {
    return knex('pages')
        .select('*')
        .where ({id: id})
        .first();
}

function editPage(data) {
    return knex('pages')
        .where({ 'id': data.id })
        .update({
            topic: data.topic,
            text : data.text
        })
        .returning(['id', 'topic', 'text','created_at', 'updated_at'])
        .then(res => res[0]);
}

module.exports = {
  getAllPages,
  addPage,
  getPage,
  editPage,
};
