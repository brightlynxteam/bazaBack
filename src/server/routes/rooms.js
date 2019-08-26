const Router = require('koa-router');
const validator = require('../helpers/validator');
const roomsQueries = require('../db/queries/rooms');

const router = new Router();

const PREFIX_URL = '/rooms';
const GET_ALL_ROOMS_URL = `${PREFIX_URL}/getAllRooms`;
const EDIT_ROOM_URL = `${PREFIX_URL}/editRoom`;
const ADD_ROOM_URL = `${PREFIX_URL}/addRoom`;
const GET_ONE_ROOM_URL = `${PREFIX_URL}/getOneRoom`;

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
                    data: res
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
            console.log(err);
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
                    data: res,
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
            console.log(err);

        }
    });

router.post(ADD_ROOM_URL,
    validator.validate(validator.ADD_ROOM_SCHEMA),
    async (ctx) => {
        //TODO добавить уровень доступа
        try {
            let data = ctx.request.body;
            let res = await roomsQueries.addRoom(data);
            ctx.status = 200;
            ctx.body = {
                status: 'OK',
                message: 'Комната добавлена!',
                data: res
            };
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                status: 'error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(err);
        }
    });

router.post(
    GET_ONE_ROOM_URL,
    validator.validate(validator.GET_ONE_ROOM_SCHEMA),
    async (ctx) => {
        try {
            let data = ctx.request.body;
            let res = await roomsQueries.getOneRoom(data);
            if (res) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Данные о комнате получены!',
                    room: res
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: 'Комната не найдена'
                }
            }
            ;
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                status: 'error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(err);
        }
    }
);

module.exports = router;
