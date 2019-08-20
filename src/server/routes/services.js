const Router = require('koa-router');
const validator = require('../helpers/validator');
const servicesQueries = require('../db/queries/services');

const router = new Router();

const PREFIX_URL = '/services';
const EDIT_SERVICE_URL = `${PREFIX_URL}/editService`;

router.post(EDIT_SERVICE_URL,
    validator.validate(validator.EDIT_SERVICE_SCHEMA),
    async (ctx) => {

        try {
            let data = ctx.request.body;
            let res = await servicesQueries.editService(data);
            
            if (res) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Услуга успешно изменена!',
                    data: res
                };
            } else {
                ctx.status = 400;
                ctx.body = {
                    status: 'error',
                    message: 'Услуга не изменена!'
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
