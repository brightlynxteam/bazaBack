const knex = require('../connection');

function editService(data) {
    return knex('services')
        .returning(['id', 'name', 'description', 'price', 'info'])
        .where({'id': data.id})
        .update(data)
        .then( res => res[0] )
}

module.exports = {
    editService,
};
