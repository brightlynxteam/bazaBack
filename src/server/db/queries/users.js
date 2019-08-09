const knex = require('../connection');

function getOneUser(data) {
    return knex('users')
        .where(data)
        .first()
        .select('id','email','phone_number','first_name','second_name', 'created_at', 'updated_at');
}

function getFindUsers(data) {
    return knex('users')
        .where({
            //временная похабщина
            second_name: data.queryString.split(' ')[0],
            first_name: data.queryString.split(' ')[1],
            phone_number: data.queryString.split(' ')[2]
            //------------------
        })    
        .select('id','phone_number','email','first_name','second_name', 'created_at', 'updated_at')
        .orderBy(data.orderBy, data.order)
        .limit(data.limit)
        .offset(data.offset);
}

module.exports = {
    getOneUser,
    getFindUsers,
};
