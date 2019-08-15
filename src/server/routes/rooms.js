const Router = require('koa-router');
const validator = require('../helpers/validator');
const roomsQueries = require('../db/queries/rooms');

const router = new Router();

const PREFIX_URL = '/rooms';
const GET_ALL_ROOMS_URL = `${PREFIX_URL}/getallrooms`;
const EDIT_ROOM_URL = `${PREFIX_URL}/editRoom`;

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

router.post(EDIT_ROOM_URL,
    validator.validate(validator.EDIT_ROOM_SCHEMA),
    async (ctx) => {
        //TODO добавить валидацию пользователя
        try {
            let data = ctx.request.body;
            let res = await roomsQueries.editRoom(data);
            if (res) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Данные о комнате изменены!',
                    room: res,
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: 'Комната не найдена'
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
