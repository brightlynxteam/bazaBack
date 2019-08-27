const knex = require('../connection');

function addNews(data) {
    return knex('news')
        .insert(data)
        .returning('*');
}

async function getAllNews(data) {

    let total = await knex('news')
        .count('id')
        .then(res => res[0].count);

    let result = await knex('news')
        .orderBy(data.orderBy, data.order)
        .offset(data.offset)
        .limit(data.limit)
        .select('id', 'title', 'description', 'main_image', 'created_at', 'updated_at');

    return {result, total};
}

function getOneNews(id) {
    return knex('news')
        .select('*')
        .where({
            id: id
        })
        .first();
}

function editNews(data) {
    return knex('news')
        .where({
            id: data.id
        })
        .update(data)
        .returning('*')
        .then(res => res[0]);
}


module.exports = {
    getAllNews,
    addNews,
    getOneNews,
    editNews,
};
