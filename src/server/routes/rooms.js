const Router = require('koa-router');
const validator = require('../helpers/validator');
const roomsQueries = require('../db/queries/rooms');

const router = new Router();

const PREFIX_URL = '/rooms';
const ADD_ROOM_URL = `${PREFIX_URL}/addRoom`;

router.post(ADD_ROOM_URL,
    validator.validate(validator.ADD_ROOM_SCHEMA),
    async (ctx) => {
        //TODO добавить уровень доступа
        try {
            let data = ctx.request.body;
            let res = await roomsQueries.addRoom(data);
            if (res.length !== 0) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Комната добавлена!',
                    room: res[0]
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: 'Комната не добавлена'
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
