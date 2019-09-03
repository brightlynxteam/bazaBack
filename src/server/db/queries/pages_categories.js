const knex = require('../connection');

function addPagesCategory(name) {
    return knex('pages_category')
        .insert({
            name: name
        })
        .returning('*');
}

function getAllPagesCategories() {

    return knex('pages_category')
        .select('id', 'name');

}

function editPagesCategory(data) {

    return knex('pages_category')
        .returning(['id', 'name'])
        .where({'id': data.id})
        .update({
            name: name
        })
        .then(res => res[0]);
}

function deletePagesCategory(id) {
    return knex('pages_category')
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
