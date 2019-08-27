const knex = require('../connection');

function addPage(data) {
    return knex('pages')
        .insert(data)
        .returning('*');
}

function getAllServices(data) {
    return knex('pages')
        .where({
            type: 'SERVICE'
        })
        .orderBy(data.orderBy, data.order)
        .offset(data.offset)
        .limit(data.limit)
        .select('id', 'text_id', 'title', 'description', 'main_image');
}

function getAllInfos(data) {
    return knex('pages')
        .where({
            type: 'INFO'
        })
        .orderBy(data.orderBy, data.order)
        .offset(data.offset)
        .limit(data.limit)
        .select('id', 'text_id', 'title', 'description', 'main_image');
}

async function getAllFAQ() {

    let data = await knex('pages')
        .select('id', 'text_id', 'title', 'description', 'content')
        .where({
            type: 'FAQ'
        })
        .orderBy('description', 'asc')
        .orderBy('title', 'asc');

    let topics = [];
    let faq = [];

    data.forEach(item => {
        if (!topics.includes(item.description)) topics.push(item.description);
    });

    topics.forEach(topic => {
        let obj = {
            topic: topic,
            faq: []
        };
        data.forEach(item => {
            if (item.description === topic) {
                obj.faq.push(item);
            }
        });
        faq.push(obj);
    });

    return faq;

}

function getOnePage(data) {
    return knex('pages')
        .select('*')
        .where(data)
        .first();
}

function editPage(data) {
    return knex('pages')
        .where({
            text_id: data.text_id
        })
        .update(data)
        .returning('*')
        .then(res => res[0]);
}

function deletePage(data) {
    return knex('pages')
        .where(data)
        .del();
}

module.exports = {
    getAllServices,
    addPage,
    getOnePage,
    editPage,
    getAllInfos,
    deletePage,
    getAllFAQ
};
