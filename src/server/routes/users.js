const Router = require('koa-router');
const validator = require('../helpers/validator');
const usersQueries = require('../db/queries/users');

const router = new Router();

const PREFIX_URL = '/user';

const GET_ONE_USER_URL = `${PREFIX_URL}`;
const FIND_USERS_URL = `${PREFIX_URL}/findUsers`

router.post(GET_ONE_USER_URL,
    validator.validate(validator.GET_ONE_USER_SCHEMA),
    async (ctx) => {

        try {
            let data = ctx.request.body;
            let res = await usersQueries.getOneUser(data);

            if (res) {
                ctx.status = 200;
                ctx.body = {
                    status: 'success',
                    message: 'Пользователь получен',
                    data: res
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: 'Пользователь не найден'
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
    })
    .post(FIND_USERS_URL,
    validator.validate(validator.FIND_USERS_SCHEMA), 
    async (ctx) => {

        try {
            let data = ctx.request.body;

            let res = await usersQueries.findUsers(data)
            if (res) {
                 ctx.status = 200;
                 ctx.body = {
               	    status: 'success',
                    message: 'Пользователи получены!',
               	    users: res
           	};
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: 'Пользователь не найден.'
                };
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
