const knex = require('../connection');

function addService(data) {
    return knex('services')
        .insert(data)
	.returning(['id', 'name', 'description', 'price', 'info'])
	.then(res => res[0]);
}

module.exports = {
	addService,
};

