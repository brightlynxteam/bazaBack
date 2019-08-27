const Router = require('koa-router');
const validator = require('../helpers/validator');
const housingsQueries = require('../db/queries/housings');

const router = new Router();

const PREFIX_URL = '/housings';
const GET_ALL_HOUSINGS_URL = `${PREFIX_URL}/getAllHousings`;
const EDIT_HOUSING_URL = `${PREFIX_URL}/editHousing`;
const GET_HOUSING_URL = `${PREFIX_URL}/getHousing`;
const ADD_HOUSING_URL = `${PREFIX_URL}/addHousing`;

router.post(
    GET_ALL_HOUSINGS_URL,
    validator.validate(validator.GET_ALL_HOUSINGS_SCHEMA),
    async ctx => {
        try {
            let data = ctx.request.body;
            let housings = await housingsQueries.getAllHousings(data);
            ctx.status = 200;
            ctx.body = {
                status: 'OK',
                message: 'Данные о корпусах получены!',
                data: housings.result,
                total: housings.total
            };
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                status: 'Error',
                message: 'Внутренняя ошибка сервера.'
            };
        }
    }
);

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
                    data: res[0]
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
            console.log(err);
        }
    });

router.post(GET_HOUSING_URL,
    validator.validate(validator.GET_HOUSING_SCHEMA),
    async (ctx) => {
        try {
            const data = ctx.request.body;
            const res = await housingsQueries.getHousing(data);
            if (res.length > 0) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Данные о корпусе получены!',
                    data: res,
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: 'Корпус не найден',
                };
                console.log(ctx.body.message);
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
                    data: res
                }
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'Error',
                    message: 'Корпус не удалось добавить!'
                }
            }
        } catch (error) {
            console.log(error);
            ctx.status = 500;
            ctx.body = {
                status: 'Error',
                message: 'Внутреняя ошибка сервера.'
            };
            console.log(error);
        }
    });

module.exports = router;
