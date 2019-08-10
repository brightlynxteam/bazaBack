const Joi = require('joi');

let validate = (schema) =>
    (ctx, next) => {
        let res = Joi.validate(ctx.request.body, schema);
        if (res.error !== null) {
            console.log(res.error);
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Введены некорректные данные!'
            };
            return;
        }
        return next();
    };

const GET_ONE_USER_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().min(1),
        email: Joi.string().email(),
        phone_number: Joi.string().regex(/^\d+$/).min(10)
    })
    .min(1);

const EDIT_RESERVATION_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().min(1).required(),
        room: Joi.number().integer(),
        user: Joi.number().integer(),
        start_date: Joi.number().integer(),
        end_date: Joi.number().integer(),
        bail: Joi.boolean(),
        paid: Joi.boolean(),
        active: Joi.boolean()
    })
    .or('room', 'user', 'start_date', 'end_date', 'bail', 'paid', 'active').min(1);

module.exports = {
    validate,
    GET_ONE_USER_SCHEMA,
    EDIT_RESERVATION_SCHEMA
};



