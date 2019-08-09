const Router = require('koa-router');
const validator = require('../helpers/validator');
const usersQueries = require('../db/queries/users');

const router = new Router();

const PREFIX_URL = '/user';
const GET_ONE_USER_URL = `${PREFIX_URL}`;
const EDIT_USER_URL = `${PREFIX_URL}/editProfile`;

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
    .post(EDIT_USER_URL,
    validator.validate(validator.EDIT_USER),
    async (ctx) => {

        try {
            let data = ctx.request.body;

            let token = 'xxx';

            //Тестовый id пользователя
            let user = {id: 1};

            // let user = await usersQueries.getOneUser(token);
            // if(!user) {
            //     ctx.status = 403;
            //     ctx.body = {
            //         status: 'error',
            //         message: 'Доступ запрещен.'
            //     };
            //     return;
            // }
            

            let res = await usersQueries.editUser(user.id, data);
            
            if (res) {
                user = await usersQueries.getOneUser({id: user.id});
                if (!user) {
                    ctx.status = 418;
                    ctx.body = {
                        status: 'error',
                        message: 'Я ЧАЙНИК!!!',
                    };
                    return;
                }

                ctx.status = 200;
                ctx.body = {
                    status: 'ОК',
                    message: 'Профиль пользователя успешно изменен!',
                    user: user
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
    });


module.exports = router;
