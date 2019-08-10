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

const EDIT_HOUSING_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().min(1).required(),
        number: Joi.number().integer().min(1),
        description: Joi.string(),
        photos: Joi.array().items(Joi.string().regex(/^.*\.+(jpg)$/)),
    })
    .min(2);

module.exports = {
    validate,
    GET_ONE_USER_SCHEMA,
    EDIT_HOUSING_SCHEMA
};



