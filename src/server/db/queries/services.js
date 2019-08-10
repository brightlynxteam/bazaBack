const knex = require('../connection');

function getService(id) {
    return knex('services').where('id', id);
}
module.exports = {
    getService
};