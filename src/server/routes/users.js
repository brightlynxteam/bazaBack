const Router = require('koa-router');
const validator = require('../helpers/validator');
const usersQueries = require('../db/queries/users');

const router = new Router();

const PREFIX_URL = '/user';
const GET_ONE_USER_URL = `${PREFIX_URL}/getOneUser`;

router.post(GET_ONE_USER_URL,
    validator.validate(validator.GET_ONE_USER_SCHEMA),
    async (ctx) => {

        try {
            let data = ctx.request.body;
            let token = 'xxx'

            if (token) {
                // Определяем пользователя по токену
                // user = await usersQueries.getOneUser(token);
                // if (!user) {
                //     ctx.status = 403;
                //     ctx.body = {
                //         status: 'error',
                //         message: 'Доступ запрещен.'
                //     }
                //     return;
                // }

                // Если json пустой, отправляем юзера
                // if (!data.length) {
                //     ctx.status = 200;
                //     ctx.body = {
                //         status: 'success',
                //         message: 'Пользователь получен',
                //         data: user
                //     };
                //     return;
                // }

                let res = await usersQueries.getOneUser(data);
                if (res) {
                    // Если уровень разрешения пользователя не достаточен, чтобы просмотреть данные этого пользователя
                    // if (user.permision < res.permision) {
                    //     ctx.status = 200;
                    //     ctx.body = {
                    //         status: 'success',
                    //         message: 'Пользователь получен',
                    //         user: user
                    //     };
                    //     return;
                    // }

                    ctx.status = 200;
                    ctx.body = {
                        status: 'success',
                        message: 'Пользователь получен',
                        user: res
                    };
                } else {
                    ctx.status = 404;
                    ctx.body = {
                        status: 'error',
                        message: 'Пользователь не найден'
                    }
                }

            } else {
                
                ctx.status = 403;
                ctx.body = {
                    status: 'error',
                    message: 'Доступ запрещен.',
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
