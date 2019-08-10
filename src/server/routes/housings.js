const Router = require('koa-router');
const validator = require('../helpers/validator');
const housingsQueries = require('../db/queries/housings');

const router = new Router();

const PREFIX_URL = '/housings';
const ADD_HOUSING_URL = `${PREFIX_URL}/addHousing`;

router.post(ADD_HOUSING_URL,
    validator.validate(validator.ADD_HOUSING_SCHEMA),
    async (ctx) => {

        try {
            let data = ctx.request.body;
            let res = await housingsQueries.addHousing(data);
            if (res) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Корпус добавлен!',
                    photos: res
                }
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'Error',
                    message: 'Корпус не удалось добавить!'
                }
            }
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: 'Error',
                message: 'Внутреняя ошибка сервера.'
            }
        }
    });

module.exports = router;