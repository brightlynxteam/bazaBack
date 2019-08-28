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
            let { name, email, phone, message } = ctx.request.body;
            let res = await feedbackQueries.sendMessage(name, email, phone, message);
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

router.get(
    GET_ALL_MESSAGES_URL,
    authHelper.checkAuth,
    rolesHelper.isAdmin,
    validator.validate(validator.GET_ALL_FEEDBACK_SCHEMA),
    async ctx => {
        try {
            let { limit, offset, orderBy, order } = ctx.request.body;
            let res = await feedbackQueries.getAllMessages(limit, offset, orderBy, order);
            if (res.length > 0) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Данные об отзывах получены!',
                    data: res
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

router.get(
    GET_ONE_NESSAGE_URL,
    authHelper.checkAuth,
    rolesHelper.isAdmin,
    validator.validate(validator.GET_ONE_FEEDBACK_SCHEMA),
    async ctx => {
        try {
            let { id } = ctx.request.body;
            let res = feedbackQueries.getOneMessage(id);
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

router.delete(
    DELETE_MESSAGE_URL,
    authHelper.checkAuth,
    rolesHelper.isAdmin,
    validator.validate(validator.DELETE_FEEDBACK_SCHEMA),
    async ctx => {
        try {
            let { id } = ctx.request.body;
            let res = feedbackQueries.deleteMessage(id);
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