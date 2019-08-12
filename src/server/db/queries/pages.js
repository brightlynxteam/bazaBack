const knex = require('../connection');

function editPage(data) {
    return knex('pages')
        .returning(['id', 'topic', 'text','created_at', 'updated_at'])
        .where({ 'id': data.id })
        .update({
            topic: data.topic,
            text : data.text
        })

}

module.exports = {
    editPage,
};
