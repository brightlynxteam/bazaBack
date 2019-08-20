const knex = require('../connection');

function editService(data) {
    return knex('services')
        .where({'id': data.id})
        .update(data)
        .returning(['id', 'name', 'description', 'price', 'info'])
        .then(res => res[0]);
}

module.exports = {
    editService,
};
