const Router = require('koa-router');
const validator = require('../helpers/validator');
const feedbackQueries = require('../db/queries/feedback');
const authHelper = require('../helpers/auth');
const rolesHelper = require('../helpers/roles');

const router = new Router();

const PREFIX_URL = '/feedback';
const SEND_MESSAGE_URL = `${PREFIX_URL}/sendMessage`;
const GET_ALL_MESSAGES_URL = `${PREFIX_URL}/getAllMessages`;
const GET_ONE_NESSAGE_URL = `${PREFIX_URL}/getOneMessage`;
const DELETE_MESSAGE_URL = `${PREFIX_URL}/deleteMessage`;

router.post(
    SEND_MESSAGE_URL,
    validator.validate(validator.ADD_FEEDBACK_SCHEMA),
    async ctx => {
        try {
            let res = await feedbackQueries.sendMessage(ctx.request.body);
            if (res) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Отзыв добавлен!',
                    data: res
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'Error',
                    message: 'Не удалось добавить отзыв!'
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

router.post(
    GET_ALL_MESSAGES_URL,
    authHelper.checkAuth,
    rolesHelper.isAdmin,
    validator.validate(validator.GET_ALL_FEEDBACK_SCHEMA),
    async ctx => {
        try {
            let res = await feedbackQueries.getAllMessages(ctx.request.body);
            if (res.result.length > 0) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Данные об отзывах получены!',
                    data: res.result,
                    total: res.total
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: 'Отзыв не найден'
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

router.post(
    GET_ONE_NESSAGE_URL,
    authHelper.checkAuth,
    rolesHelper.isAdmin,
    validator.validate(validator.GET_ONE_FEEDBACK_SCHEMA),
    async ctx => {
        try {
            let res = await feedbackQueries.getOneMessage(ctx.request.body);
            ctx.status = 200;
            ctx.body = {
                status: 'OK',
                message: 'Данные об отзыве получены!',
                data: res
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

router.post(
    DELETE_MESSAGE_URL,
    authHelper.checkAuth,
    rolesHelper.isAdmin,
    validator.validate(validator.DELETE_FEEDBACK_SCHEMA),
    async ctx => {
        try {
            let res = await feedbackQueries.deleteMessage(ctx.request.body);
            if (res) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Отзыв удален!'
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'Error',
                    message: 'Отзыв не найден'
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
