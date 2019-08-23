const Router = require('koa-router');
const validator = require('../helpers/validator');
const usersQueries = require('../db/queries/users');
const authHelper = require('../helpers/auth');

const router = new Router();

const PREFIX_URL = '/auth';
const REGISTER_USER_URL = `${PREFIX_URL}/register`;
const LOGIN_URL = `${PREFIX_URL}/login`;
const CHECK_URL = `${PREFIX_URL}/check`;
const LOGOUT_URL = `${PREFIX_URL}/logout`;


router.post(
    REGISTER_USER_URL,
    validator.validate(validator.REGISTER_USER_SCHEMA),
    async ctx => {
        try {
            let data = ctx.request.body;
            data.password = await authHelper.getHash(data.password);

            let [err, user] = await usersQueries.register(data);
            if (user) {

                let tokens = await authHelper.updateTokens(user.id);

                ctx.cookies.set('access_token', tokens.access_token);
                ctx.cookies.set('refresh_token', tokens.refresh_token);

                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Пользователь зарегистрирован!',
                    data: user
                };
            } else if (err) {
                ctx.status = 409;
                ctx.body = {
                    status: 'Error',
                    message: err
                };
                console.log(err);
            }
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                status: 'Error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(err);
        }
    }
);

router.post(LOGIN_URL,
    validator.validate(validator.LOGIN_SCHEMA),
    async (ctx) => {

        try {
            let data = ctx.request.body;
            let userData = (data.email) ? {email: data.email} : {phone_number: data.phone_number};


            let user = await usersQueries.login(userData);

            if (!user) {

                ctx.status = 401;
                ctx.body = {
                    status: 'error',
                    message: 'Пользователь не найден!'
                };
                return
            }

            let rightPassword = await authHelper.comparePassword(data.password, user.password);

            let res = await usersQueries.getOneUser(user);
            if (rightPassword && res) {

                let tokens = await authHelper.updateTokens(res.id);

                ctx.cookies.set('access_token', tokens.access_token);
                ctx.cookies.set('refresh_token', tokens.refresh_token);

                ctx.status = 200;
                ctx.body = {
                    status: 'success',
                    message: 'Пользователь залогинен!',
                    data: res
                }
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
            console.log(err);
        }
    });

router.post(LOGOUT_URL,
    authHelper.checkAuth,
    async (ctx) => {

        try {
            let user = ctx.state.user;

            let res = await usersQueries.updateToken(user.id, '');
            if (res) {
                ctx.cookies.set('access_token', '');
                ctx.cookies.set('refresh_token', '');

                ctx.status = 200;
                ctx.body = {
                    status: 'success',
                    message: 'Пользователь разлогинен!'
                }
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
            console.log(err);
        }
    });

router.post(CHECK_URL,
    authHelper.checkAuth,
    async (ctx) => {

        ctx.status = 200;
        ctx.body = {
            status: 'ok',
            data: ctx.state.user
        };

    });

module.exports = router;


