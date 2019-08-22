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
  ctx.request.body = res.value;
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

const FIND_USERS_SCHEMA = Joi
    .object()
    .keys({
        queryString: Joi.string().required(),
        limit: Joi.number().default(10),
        offset: Joi.number().default(0),
        orderBy: Joi.string().default('id'),
        order : Joi.string().default('ASC').valid('ASC, DESC'),
    });

const EDIT_ROOM_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().min(1).required(),
        number: Joi.number().integer().min(1),
        description: Joi.string(),
        active: Joi.boolean(),
        housing: Joi.number().integer().min(1),
        capacity: Joi.number().integer().min(1),
    })
    .min(2);

const GET_PAGE_SCHEMA = Joi.object()
    .keys({
        id: Joi.number().integer().min(1).required()
    })
    .min(1);

const GET_ALL_USERS_SCHEMA = Joi
    .object()
    .keys({
        limit : Joi.number().integer().min(1).default(10),
        offset: Joi.number().integer().min(0).default(0),
        orderBy: Joi.string().default('id'),
        order: Joi.string().lowercase().valid('asc', 'desc').default('asc')
    });

const GET_HOUSING_SCHEMA = Joi
  .object()
  .keys({
    id: Joi.number().integer().required().min(1)
  });

const EDIT_USER_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().required(), 
        phone_number: Joi.string().regex(/^\d+$/).min(11),
        email: Joi.string().email(),
        first_name: Joi.string(),
        second_name: Joi.string(),
    })
    .min(2);

const EDIT_PAGE_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().min(1).required(),
        topic: Joi.string(),
        text: Joi.string()
    })
    .or('topic', 'text');

const ADD_SERVICE_SCHEMA = Joi
    .object()
    .keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.string().required(),
        info: Joi.string().required()
    });

const EDIT_SERVICE_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().min(1).required(),
        name: Joi.string(),
        description: Joi.string(),
        price: Joi.string(),
        info: Joi.string()
    })
    .or('name','description','price','info');

const ADD_ROOM_SCHEMA = Joi
    .object()
    .keys({
        number: Joi.number().integer().min(1).required(),
        description: Joi.string().required(),
        active: Joi.boolean().required(),
        housing: Joi.number().integer().min(1).required(),
        capacity: Joi.number().integer().min(1).required(),
    });

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

const ADD_HOUSING_SCHEMA = Joi
    .object()
    .keys({
        number: Joi.number().required(),
        description: Joi.string().required(),
        photos: Joi.array().required()
    });

module.exports = {
    validate,
    GET_ONE_USER_SCHEMA,
    LOGIN_SCHEMA,
    REGISTER_USER_SCHEMA,
    GET_ALL_PAGES_SCHEMA,
    GET_ALL_HOUSINGS_SCHEMA,
    GET_ALL_SERVICES_SCHEMA,
    GET_SERVICE_SCHEMA,
    GET_ALL_ROOMS_SCHEMA,
    EDIT_HOUSING_SCHEMA,
    ADD_RESERVATION_SCHEMA,
    FIND_USERS_SCHEMA,
    EDIT_ROOM_SCHEMA,
    ADD_PAGE_SCHEMA,
    GET_PAGE_SCHEMA,
    GET_ALL_USERS_SCHEMA,
    GET_HOUSING_SCHEMA,
    EDIT_USER_SCHEMA,
    EDIT_PAGE_SCHEMA,
    ADD_SERVICE_SCHEMA,
    EDIT_SERVICE_SCHEMA,
    ADD_ROOM_SCHEMA,
    EDIT_RESERVATION_SCHEMA,
    ADD_HOUSING_SCHEMA,
};
