const knex = require('../connection');

function getOneUser(data) {
    return knex('users')
        .where(data)
        .first()
        .select('id','email','phone_number','first_name','second_name', 'created_at', 'updated_at');
}

module.exports = {
    getOneUser,
};
