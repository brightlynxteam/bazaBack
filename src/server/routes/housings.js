const Router = require('koa-router');
const validator = require('../helpers/validator');
const roomsQueries = require('../db/queries/housings');

const router = new Router();

const PREFIX_URL = '/housings';
const EDIT_HOUSING_URL = `${PREFIX_URL}/editHousing`;

router.post(EDIT_HOUSING_URL,
    validator.validate(validator.EDIT_HOUSING_SCHEMA),
    async (ctx) => {
        //TODO добавить уровень доступа
        try {
            let data = ctx.request.body;
            let res = await roomsQueries.editHousing(data);
            if (res) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Корпус успешно изменен!',
                    housing: res[0]
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: 'Корпус не найден'
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
