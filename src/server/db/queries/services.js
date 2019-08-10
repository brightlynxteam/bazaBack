const knex = require('../connection');

function editService(data) {
    return knex('services')
        .returning(['id', 'name', 'description', 'price', 'info'])
        .where({'id': data.id})
        .update(data)
}

module.exports = {
    editService,
};
