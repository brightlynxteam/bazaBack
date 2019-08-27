const knex = require('../connection');

function sendMessage(name, email, phone, message) {
    return knex('feedback')
        .insert({
            name: name,
            email, email,
            phone: phone,
            message: message
        });
}

function getAllMessages(limit, offset, orderBy, order) {
    return knex('feedback')
        .limit(limit)
        .offset(offset)
        .orderBy(orderBy, order)
        .select('id', 'name', 'email', 'phone', 'message');
}

function getOneMessage(id) {
    return knex('feedback')
        .select('id', 'name', 'email', 'phone', 'message')
        .where('id', id);
}

function deleteMessage(id) {
    return knex('feedback')
        .where('id', id)
        .del()
}

module.exports = {
    sendMessage,
    getAllMessages,
    getOneMessage,
    deleteMessage
};