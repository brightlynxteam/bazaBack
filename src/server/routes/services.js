const Router = require('koa-router');
const validator = require('../helpers/validator');
const servicesQueries = require('../db/queries/services');

const router = new Router();

const PREFIX_URL = '/services';
const ADD_SERVICE_URL = `${PREFIX_URL}/addService`;

router.post(ADD_SERVICE_URL,
    validator.validate(validator.ADD_SERVICE_SCHEMA),
    async (ctx) => {

        try {
            let data = ctx.request.body;
            let res = await servicesQueries.addService(data);

            if (res) { 

                ctx.status = 200;
                ctx.body = {
                    status: 'success',
                    message: 'Услуга добавлена!',
                    data: res
                };
            } else {
                ctx.status = 400;
                ctx.body = {
                    status: 'error',
                    message: 'Услуга не добавлена!'
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
