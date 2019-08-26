const Router = require('koa-router');
const newsQueries = require('../db/queries/news');
const validator = require('../helpers/validator');
const authHelper = require('../helpers/auth');
const rolesHelper = require('../helpers/roles');

const router = new Router();

const PREFIX_URL = `/news`;
const GET_ONE_NEWS_URL = `${PREFIX_URL}/getOneNews`;
const GET_ALL_NEWS_URL = `${PREFIX_URL}/getAllNews`;
const ADD_NEWS_URL = `${PREFIX_URL}/addNews`;
const EDIT_NEWS_URL = `${PREFIX_URL}/editNews`;

router.post(
    ADD_NEWS_URL,
    validator.validate(validator.ADD_NEWS_SCHEMA),
    async ctx => {
        try {
            let data = ctx.request.body;
            let news = await newsQueries.addNews(data);
            ctx.status = 200;
            ctx.body = {
                status: 'OK',
                message: 'Новость добавлена',
                data: news
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: 'Error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(error);
        }
    }
);

router.post(GET_ONE_NEWS_URL,
    validator.validate(validator.GET_ONE_NEWS_SCHEMA),
    async (ctx) => {
        try {

            let data = ctx.request.body;
            const resultData = await newsQueries.getOneNews(data.id);

            if (resultData) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Новость получена!',
                    news: resultData
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'Error',
                    message: 'Новость не найдена'
                };
            }
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                status: 'Error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(err)
        }
    }
);

router.post(
    GET_ALL_NEWS_URL,
    validator.validate(validator.GET_ALL_NEWS_SCHEMA),
    async ctx => {
        try {
            let data = ctx.request.body;
            let news = await newsQueries.getAllNews(data);
            ctx.status = 200;
            ctx.body = {
                status: 'OK',
                message: 'Список новостей получен',
                data: news
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: 'Error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(error);
        }
    }
);

router.post(EDIT_NEWS_URL,
    validator.validate(validator.EDIT_NEWS_SCHEMA),
    authHelper.checkAuth,
    rolesHelper.isAdmin,
    async (ctx) => {

        try {
            let data = ctx.request.body;
            let res = await newsQueries.editNews(data);

            if (res) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Новость изменена!',
                    data: res
                };
            } else {
                ctx.status = 400;
                ctx.body = {
                    status: 'error',
                    message: 'Некорректные данные'
                };
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

module.exports = router;
