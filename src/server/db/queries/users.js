const knex = require('../connection');

function getOneUser(data) {
    return knex('users')
        .where(data)
        .first()
        .select('id','email','phone_number','first_name','second_name', 'created_at', 'updated_at');
}

function findUsers(data) {
    return knex('users')
        .whereRaw(`
            to_tsvector('russian', first_name) || 
            to_tsvector('russian', second_name) || 
            to_tsvector('russian', email) ||
            to_tsvector('russian', phone_number) @@ 
            plainto_tsquery('russian', '${data.queryString}')
            `
        )    
        .select('id','phone_number','email','first_name','second_name', 'created_at', 'updated_at')
        .orderBy(data.orderBy, data.order)
        .limit(data.limit)
        .offset(data.offset);
}

module.exports = {
    getOneUser,
    findUsers,
};
