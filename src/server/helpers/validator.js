const Joi = require('joi');

let validate = schema => (ctx, next) => {
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

const GET_ONE_USER_SCHEMA = Joi.object()
  .keys({
    id: Joi.number()
      .integer()
      .min(1),
    email: Joi.string().email(),
    phone_number: Joi.string()
      .regex(/^\d+$/)
      .min(10)
  })
  .min(1);

const REGISTER_USER_SCHEMA = Joi.object()
  .keys({
    phone_number: Joi.string()
      .regex(/^\d+$/)
      .length(11)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    first_name: Joi.string().required(),
    second_name: Joi.string().required(),
    password: Joi.string().required()
  });
    
const LOGIN_SCHEMA = Joi
    .object()
    .keys({
        phone_number: Joi.string().regex(/^\d+$/).length(11),
        email: Joi.string().email(),
        password: Joi.string().required()
    })
    .or('email', 'phone_number');

const GET_ALL_PAGES_SCHEMA = Joi.object()
  .keys({
    limit: Joi.number().default(10),
    offset: Joi.number().default(0),
    orderBy: Joi.string().default('id'),
    order: Joi.string()
      .regex(/^(ASC|DESC)$/)
      .default('ASC')
  });

const GET_ALL_HOUSINGS_SCHEMA = Joi.object().keys({
  limit: Joi.number().default(10),
  offset: Joi.number().default(0),
  orderBy: Joi.string().default('id'),
  order: Joi.string()
    .regex(/^(ASC|DESC)$/)
    .default('ASC')
});

const ADD_PAGE_SCHEMA = Joi.object().keys({
  topic: Joi.string().required(),
  text: Joi.string().required()
});

const GET_ALL_SERVICES_SCHEMA = Joi.object().keys({
  limit: Joi.number().default(10),
  offset: Joi.number().default(0),
  orderBy: Joi.string().default('id'),
  order: Joi.string()
    .regex(/^(ASC|DESC)$/)
    .default('ASC')
});

const GET_SERVICE_SCHEMA = Joi.object().keys({
    id: Joi.number().integer().min(1)
    });

const GET_ALL_ROOMS_SCHEMA = Joi
    .object()
    .keys({
        limit : Joi.number().integer().min(1).default(10),
        offset: Joi.number().integer().min(0).default(0),
        orderBy: Joi.string().default('id'),
        order: Joi.string().regex(/^(ASC|DESC)$/).default('ASC')
    });

const EDIT_HOUSING_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().min(1).required(),
        number: Joi.number().integer().min(1),
        description: Joi.string(),
        photos: Joi.array().items(Joi.string().regex(/^.*\.+(jpg)$/)),
    })
    .min(2);

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
    LOGIN_SCHEMA,
    REGISTER_USER_SCHEMA,
    GET_ALL_PAGES_SCHEMA,
    GET_ALL_HOUSINGS_SCHEMA,
    ADD_PAGE_SCHEMA,
    GET_ALL_SERVICES_SCHEMA,
    GET_SERVICE_SCHEMA,
    GET_ALL_ROOMS_SCHEMA,
    EDIT_HOUSING_SCHEMA,
    ADD_RESERVATION_SCHEMA
};
