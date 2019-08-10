const knex = require('../connection');

function addService(data) {
	return knex('services')
		.returning(['id', 'name', 'description', 'price', 'info'])
        .insert(data)
}

module.exports = {
	addService,
};

