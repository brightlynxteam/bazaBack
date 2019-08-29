const knex = require('../connection');

function sendMessage(data) {
    return knex('feedback').insert(data);
}

function getAllMessages(data) {
    return knex('feedback')
        .limit(data.limit)
        .offset(data.offset)
        .orderBy(data.orderBy, data.order)
        .select('id', 'name', 'email', 'phone', 'message');
}

function getOneMessage(data) {
    return knex('feedback')
        .select('id', 'name', 'email', 'phone', 'message')
        .where('id', data.id);
}

function deleteMessage(id) {
    return knex('feedback')
        .where('id', data.id)
        .del();
}

module.exports = {
    sendMessage,
    getAllMessages,
    getOneMessage,
    deleteMessage
};