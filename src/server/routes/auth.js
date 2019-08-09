const Router = require('koa-router');
const validator = require('../helpers/validator');
const usersQueries = require('../db/queries/users');

const router = new Router();

const PREFIX_URL = '/auth';
const GET_ONE_USER_URL = `${PREFIX_URL}/login`;

router.post(GET_ONE_USER_URL,
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
