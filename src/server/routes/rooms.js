const Router = require('koa-router');
const validator = require('../helpers/validator');
const roomsQueries = require('../db/queries/rooms');

const router = new Router();

const PREFIX_URL = '/rooms';
const GET_ALL_ROOMS_URL = `${PREFIX_URL}/getallrooms`;


router.post(GET_ALL_ROOMS_URL,
    validator.validate(validator.GET_ALL_ROOMS_SCHEMA),
    async (ctx) => {
        try {
            let data = ctx.request.body;
            let res = await roomsQueries.getAllRooms(data);
            if (res) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Данные о комнатах получены!',
                    rooms: res
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: 'Комнаты не найдены'
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
