const knex = require('../connection');

function editPage(data) {
    return knex('pages')
        .where({ 'id': data.id })
        .update({
            topic: data.topic,
            text : data.text
        })

}

module.exports = {
    editPage,
};
