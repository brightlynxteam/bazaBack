const Router = require('koa-router');
const validator = require('../helpers/validator');
const usersQueries = require('../db/queries/users');
const authHelper = require('../helpers/auth');
// const mailerHelper = require('../helpers/mailer');

const router = new Router();

const PREFIX_URL = '/auth';
const REGISTER_USER_URL = `${PREFIX_URL}/register`;
const LOGIN_URL = `${PREFIX_URL}/login`;
const CHECK_URL = `${PREFIX_URL}/check`;
const LOGOUT_URL = `${PREFIX_URL}/logout`;
const SEND_RECOVERY_HASH = `${PREFIX_URL}/sendRecoveryHash`;
const CHECK_RECOVERY_HASH = `${PREFIX_URL}/checkRecoveryHash`;
const SET_NEW_PASSWORD = `${PREFIX_URL}/setNewPassword`;


router.post(SEND_RECOVERY_HASH,
    validator.validate(validator.GET_ONE_USER_SCHEMA),
    async (ctx) => {
        try {
            let data = ctx.request.body;
            let hash = await authHelper.getRecoveryHash(data.email);

            // await mailerHelper.sendRecoveryHash(data.email, hash)

            ctx.status = 200;
            ctx.body = {
                status: 'ok',
            };
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                status: 'error',
                message: 'Внутренняя ошибка сервера.',
            };
            console.log(err);
        }
    });

router.post(CHECK_RECOVERY_HASH,
    async (ctx) => {
        try {
            let data = ctx.request.body;
            let res = await authHelper.checkRecoveryHash(data.email, data.hash);
            if (res) {
                ctx.status = 200;
                ctx.body = {
                    status: 'success',
                };
            } else {
                ctx.status = 400;
                ctx.body = {
                    status: 'error',
                };
            }
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                status: 'error',
                message: 'Внутренняя ошибка сервера.',
            };
            console.log(err);
        }
    });

    router.post(SET_NEW_PASSWORD,
        async (ctx) => {
            try {
                let data = ctx.request.body;
                let res = await authHelper.checkRecoveryHash(data.email, data.hash);
                if (res) {
                    let hashNewPassword = await authHelper.getHash(data.newPassword);
                    let accessUser = await usersQueries.getOneUser({email: data.email});

                    await usersQueries.editUser(accessUser.id, {password: hashNewPassword});
                    
                    ctx.status = 200;
                    ctx.body = {
                        status: 'success',
                        message: 'Пароль изменен',
                    };
                } else {
                    ctx.status = 400;
                    ctx.body = {
                        status: 'error',
                        message: 'Некорректный Hash', 
                    };
                }
            } catch (err) {
                ctx.status = 500;
                ctx.body = {
                    status: 'error',
                    message: 'Внутренняя ошибка сервера.',
                };
                console.log(err);
            }
        });

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
            let userData = (data.login.includes('@')) ? {email: data.login} : {phone_number: data.login};


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


