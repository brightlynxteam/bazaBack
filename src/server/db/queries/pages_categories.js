const knex = require('../connection');

function addPagesCategory(name) {
    return knex('pages_categories')
        .insert({
            name: name
        })
        .returning('*');
}

function getAllPagesCategories() {

    return knex('pages_categories')
        .select('id', 'name');

}

function editPagesCategory(data) {

    return knex('pages_categories')
        .returning(['id', 'name'])
        .where({'id': data.id})
        .update({
            name: name
        })
        .then(res => res[0]);
}

function deletePagesCategory(id) {
    return knex('pages_categories')
        .where({
            id: id
        })
        .del();
}

module.exports = {
  addPagesCategory,
  getAllPagesCategories,
  editPagesCategory,
  deletePagesCategory
};
