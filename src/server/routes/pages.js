const Router = require('koa-router');
const validator = require('../helpers/validator');
const pagesQueries = require('../db/queries/pages');

const router = new Router();

const PREFIX_URL = '/pages';
const GET_ONE_USER_URL = `${PREFIX_URL}/editPage`;

router.post(GET_ONE_USER_URL,
    validator.validate(validator.EDIT_PAGE_SCHEMA),
    async (ctx) => {

        try {
            let data = ctx.request.body;
            let res = await pagesQueries.editPage(data);
            if (res) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Страница изменена!',
                    data: res
                };
            } else {
                ctx.status = 400;
                ctx.body = {
                    status: 'error',
                    message: 'Некорректные данные'
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
