const knex = require('../connection');

function getAllServices(data) {
    return knex('services')
        .limit(data.limit)
        .offset(data.offset)
        .orderBy(data.orderBy, data.order)
        .select('id', 'name', 'description', 'price', 'info');
}

function getService(id) {
    return knex('services')
        .where('id', id);
}

function addService(data) {
    return knex('services')
        .insert(data)
        .returning(['id', 'name', 'description', 'price', 'info'])
        .then(res => res[0]);
}

function editService(data) {
    return knex('services')
        .where({'id': data.id})
        .update(data)
        .returning(['id', 'name', 'description', 'price', 'info'])
        .then(res => res[0]);
}

module.exports = {
    getAllServices,
    getService,
    addService,
    editService,
};
