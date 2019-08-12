const Router = require('koa-router');
const validator = require('../helpers/validator');
const usersQueries = require('../db/queries/users');
const router = new Router();

const PREFIX_URL = '/auth';
const REGISTER_USER_URL = `${PREFIX_URL}/register`;

router.post(
  REGISTER_USER_URL,
  validator.validate(validator.REGISTER_USER_SCHEMA),
  async ctx => {
    try {
      let data = ctx.request.body;
      let [err, user] = await usersQueries.register(data);
      if (user) {
        ctx.status = 200;
        ctx.body = {
          status: 'OK',
          message: 'Пользователь зарегистрирован!',
          user
        };
      } else if (err) {
        ctx.status = 409;
        ctx.body = {
          status: 'Error',
          message: err
        };
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        status: 'Error',
        message: 'Внутренняя ошибка сервера.'
      };
    }
  }
);

module.exports = router;
