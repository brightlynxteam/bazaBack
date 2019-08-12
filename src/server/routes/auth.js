const Router = require('koa-router');
const validator = require('../helpers/validator');
const usersQueries = require('../db/queries/users');

const router = new Router();

const PREFIX_URL = '/auth';
const REGISTER_USER_URL = `${PREFIX_URL}/register`;
const LOGIN_URL = `${PREFIX_URL}/login`;

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

router.post(LOGIN_URL,
    validator.validate(validator.LOGIN_SCHEMA),
    async (ctx) => {

        try {
            let data = ctx.request.body;
            let res = await usersQueries.getOneUser(data);
            if (res) {
                ctx.status = 200;
                ctx.body = {
                    status: 'success',
                    message: 'Пользователь залогинен!',
                    data: res
                };
            } else {
                ctx.status = 401;
                ctx.body = {
                    status: 'error',
                    message: 'Неверный пароль!'
                }
            }
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                status: 'error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(err)
        }
    });


module.exports = router;
