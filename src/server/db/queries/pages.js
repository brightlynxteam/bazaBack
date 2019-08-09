const knex = require('../connection');

function getPage(id) {
    return knex('pages')
        .select('*')
        .where ({id: id});
}

module.exports = {
    getPage
};