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

const ADD_RESERVATION_SCHEMA = Joi
    .object()
    .keys({
        room: Joi.number().integer(),
        user: Joi.number().integer(),
        start_date: Joi.number().integer(),
        end_date: Joi.number().integer(),
        bail: Joi.boolean(),
        paid: Joi.boolean(),
        active: Joi.boolean()
    })
    .required();

module.exports = {
    validate,
    GET_ONE_USER_SCHEMA,
    ADD_RESERVATION_SCHEMA
};



