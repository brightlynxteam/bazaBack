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
    .then(res => [null, res])
    .catch(err => {
      let message = '';
      if (err.constraint == 'users_phone_number_unique') {
        message = 'Пользователь с таким номером телефона уже существует';
      } else if (err.constraint == 'users_email_unique') {
        message = 'Пользователь с таким ящиком уже существует';
      }
      return [message];
    });
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

function getAllUsers(data) {
    return knex('users')
        .limit(data.limit)
        .offset(data.offset)
        .orderBy(data.orderBy, data.order)
        .select('id','email','phone_number','first_name','second_name', 'created_at', 'updated_at');
}

function editUser(id, data) {
    return knex('users')
        .where({'id': id})
        .update(data)
}

module.exports = {
  getOneUser,
  register,
  findUsers,
  getAllUsers,
  login,
  editUser
};
