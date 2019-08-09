const knex = require('../connection');

function getOneUser(data) {
    return knex('users')
        .where(data)
        .first()
        .select('id','email','phone_number','first_name','second_name', 'created_at', 'updated_at');
}

function editUser(id, data) {
    return knex('users')
        .where({'id': id})
        .update(data)
}

module.exports = {
    getOneUser,
    editUser,
};
