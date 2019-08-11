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
        //Чтобы возвращала входные данные с добавленными
        //дефолтными значениями
        ctx.request.body = res.value
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

const GET_FIND_USERS_SCHEMA = Joi
    .object()
    .keys({
        queryString: Joi.string().required(),
        limit: Joi.number().default(10),
        offset: Joi.number().default(0),
        orderBy: Joi.string().default('id'),
        order : Joi.string().default('ASC').valid('ASC, DESC'),
    });

module.exports = {
    validate,
    GET_ONE_USER_SCHEMA,
    GET_FIND_USERS_SCHEMA,
};



