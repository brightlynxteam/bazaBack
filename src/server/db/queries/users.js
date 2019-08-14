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

function signRefreshToken(data){
  return knex('users')
      .where('id',data.id)
      .update('refresh_token',data.refreshToken);
}

module.exports = {
  getOneUser,
  register,
  signRefreshToken
};
