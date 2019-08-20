const knex = require('../connection');

function editPage(data) {
    return knex('pages')
        .where({ 'id': data.id })
        .update({
            topic: data.topic,
            text : data.text
        })
        .returning(['id', 'topic', 'text','created_at', 'updated_at'])
        .then(res => res[0]);

}

module.exports = {
    editPage,
};
