const knex = require('../connection');

function getOneUser(data) {
    return knex('users')
        .where(data)
        .first()
        .select(
            'id',
            'email',
            'phone_number',
            'first_name',
            'second_name',
            'isAdmin',
            'created_at',
            'updated_at'
        );
}

function login(data) {
    return knex('users')
        .where(data)
        .first()
        .select(
            'id',
            'password',
        );
}

function register(data) {
    return knex('users')
        .insert(data)
        .returning('*')
        .then(res => [null, res[0]])
        .catch(err => {
            let message = '';
            if (err.constraint === 'users_phone_number_unique') {
                message = 'Пользователь с таким номером телефона уже существует';
            } else if (err.constraint === 'users_email_unique') {
                message = 'Пользователь с таким ящиком уже существует';
            }
            return [message];
        });
}

async function findUsers(data) {

    let whereRaw = `
            to_tsvector('russian', first_name) || 
            to_tsvector('russian', second_name) || 
            to_tsvector('russian', email) ||
            to_tsvector('russian', phone_number) @@ 
            plainto_tsquery('russian', '${data.queryString}')
            `;

    let total = await knex('users')
        .whereRaw(whereRaw)
        .count('id')
        .then(res => res[0].count);

    let result = await knex('users')
        .whereRaw(whereRaw)
        .select('id', 'phone_number', 'email', 'first_name', 'second_name', 'created_at', 'updated_at')
        .orderBy(data.orderBy, data.order)
        .limit(data.limit)
        .offset(data.offset);

    return {result, total};
}

async function getAllUsers(data) {

    let total = await knex('users')
        .count('id')
        .then(res => res[0].count);

    let result = await knex('users')
        .limit(data.limit)
        .offset(data.offset)
        .orderBy(data.orderBy, data.order)
        .select('id', 'email', 'phone_number', 'first_name', 'second_name', 'created_at', 'updated_at');

    return {result, total};
}

function editUser(id, data) {
    return knex('users')
        .where({'id': id})
        .update(data)
        .returning(['id', 'email', 'phone_number', 'first_name', 'second_name', 'created_at', 'updated_at'])
        .then(res => res[0]);
}

function updateToken(id, token){
  return knex('users')
      .where('id',id)
      .update('refresh_token',token);
}

module.exports = {
    getOneUser,
    register,
    findUsers,
    getAllUsers,
    login,
    editUser,
    updateToken,
};
