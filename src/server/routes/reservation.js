const Router = require('koa-router');
const validator = require('../helpers/validator');
const reservationQueries = require('../db/queries/reservation');
const router = new Router();

const PREFIX_URL = '/reservation';
const ADD_RESERVATION_URL = `${PREFIX_URL}/addReservation`;
const EDIT_RESERVATION_URL = `${PREFIX_URL}/editReservation`;
const GET_FREE_ROOMS_URL = `${PREFIX_URL}/getFreeRooms`;
const GET_ROOM_RESERVATIONS_URL = `${PREFIX_URL}/getRoomReservations`;

router.post(ADD_RESERVATION_URL,
    validator.validate(validator.ADD_RESERVATION_SCHEMA),
    async (ctx) => {

        //TODO добавить проверку залогинен пользователь или нет

        try {
            let data = ctx.request.body;
            let reservation = await reservationQueries.addReservation(data);

            if (reservation) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Бронирование добавлено!',
                    data: reservation
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: 'Бронирование не добавлено'
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
    }
);

router.post(EDIT_RESERVATION_URL,
    validator.validate(validator.EDIT_RESERVATION_SCHEMA),
    async (ctx) => {

        //TODO добавить проверку на администратора

        try {
            let data = ctx.request.body;
            let reservation = await reservationQueries.editReservation(data);

            if (reservation) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Бронирование изменено!',
                    data: reservation
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: 'Бронирование не найдено'
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
    }
);

router.post(GET_FREE_ROOMS_URL,
    validator.validate(validator.GET_FREE_ROOMS_SCHEMA),
    async (ctx) => {

        try {
            let data = ctx.request.body;
            let rooms = await reservationQueries.getFreeRooms(data);

            if (rooms.length) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Номера получены!',
                    data: rooms
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: 'Нет свободных номеров!'
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
    }
);

router.post(GET_ROOM_RESERVATIONS_URL,
    validator.validate(validator.GET_ROOM_RESERVATIONS_SCHEMA),
    async (ctx) => {

        try {
            let id = ctx.request.body.id;
            let reservations = await reservationQueries.getRoomReservations(id);

            ctx.status = 200;
            ctx.body = {
                status: 'OK',
                message: 'Бронирования получены!',
                data: reservations
            };

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
