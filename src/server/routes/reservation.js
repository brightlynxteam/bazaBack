const Router = require('koa-router');
const validator = require('../helpers/validator');
const reservationQueries = require('../db/queries/reservation');
const router = new Router();

const PREFIX_URL = '/reservation';
const EDIT_RESERVATION_URL = `${PREFIX_URL}/editReservation`;

router.post(EDIT_RESERVATION_URL,
    validator.validate(validator.EDIT_RESERVATION_SCHEMA),
    async (ctx) => {

        //TODO добавить проверку на администратора

        try {
            let data = ctx.request.body;
            let reservation = await reservationQueries.editReservation(data);

            if (reservation){
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Бронирование изменено!',
                    reservation: reservation
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
        }
    }
);

module.exports = router;