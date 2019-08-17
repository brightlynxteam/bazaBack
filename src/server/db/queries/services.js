const knex = require('../connection');

function addService(data) {
    return knex('services')
        .returning(['id', 'name', 'description', 'price', 'info'])
        .insert(data)
	.then( res => res[0] )
}

module.exports = {
	addService,
};

