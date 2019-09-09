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
        login: [Joi.string().regex(/^\d+$/).length(11), Joi.string().email()],
        password: Joi.string()
    })
    .required('login', 'password');

const GET_ALL_SERVICES_SCHEMA = Joi.object()
    .keys({
        limit: Joi.number().default(10),
        offset: Joi.number().default(0),
        orderBy: Joi.string().default('id'),
        order: Joi.string()
            .regex(/^(asc|desc)$/)
            .default('asc')
    });

const GET_ALL_INFOS_SCHEMA = Joi.object()
    .keys({
        limit: Joi.number().default(10),
        offset: Joi.number().default(0),
        orderBy: Joi.string().default('id'),
        order: Joi.string()
            .regex(/^(asc|desc)$/)
            .default('asc')
    });

const GET_ALL_HOUSINGS_SCHEMA = Joi.object().keys({
    limit: Joi.number().default(10),
    offset: Joi.number().default(0),
    orderBy: Joi.string().default('id'),
    order: Joi.string()
        .regex(/^(asc|desc)$/)
        .default('asc')
});

const ADD_PAGE_SCHEMA = Joi.object().keys({
    text_id: Joi.string().required(),
    type: Joi.string().valid('SERVICE', 'INFO', 'FAQ').required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.number().integer(),
    content: Joi.string().required(),
    main_image: Joi.string(),
    content_images: Joi.array().items(Joi.string()),
    active: Joi.boolean()
});

const GET_ALL_ROOMS_SCHEMA = Joi
    .object()
    .keys({
        limit: Joi.number().integer().min(1).default(10),
        offset: Joi.number().integer().min(0).default(0),
        orderBy: Joi.string().default('id'),
        order: Joi.string().regex(/^(asc|desc)$/).default('asc')
    });

const EDIT_HOUSING_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().min(1).required(),
        number: Joi.number().integer().min(1),
        description: Joi.string(),
        photos: Joi.array().items(Joi.string()),
        title: Joi.string()
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
        order: Joi.string().default('asc').valid('asc', 'desc')
    });

const EDIT_ROOM_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().min(1).required(),
        number: Joi.number().integer().min(1),
        description: Joi.string(),
        main_image: Joi.string(),
        content_images: Joi.array().items(Joi.string()),
        price: Joi.number().integer().min(1),
        active: Joi.boolean(),
        housing: Joi.number().integer().min(1),
        capacity: Joi.number().integer().min(1),
    })
    .min(2);

const GET_ONE_PAGE_SCHEMA = Joi.object()
    .keys({
        text_id: Joi.string().required()
    });

const DELETE_PAGE_SCHEMA = Joi.object()
    .keys({
        text_id: Joi.string().required()
    });

const GET_ALL_USERS_SCHEMA = Joi
    .object()
    .keys({
        limit: Joi.number().integer().min(1).default(10),
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
        password: Joi.string()
    })
    .min(2);

const EDIT_PAGE_SCHEMA = Joi
    .object()
    .keys({
        text_id: Joi.string().required(),
        type: Joi.string().valid('SERVICE', 'INFO', 'FAQ'),
        title: Joi.string(),
        description: Joi.string(),
        category: Joi.number().integer(),
        content: Joi.string(),
        main_image: Joi.string(),
        content_images: Joi.array().items(Joi.string()),
        active: Joi.boolean()
    })
    .min(2);

const ADD_ROOM_SCHEMA = Joi
    .object()
    .keys({
        number: Joi.number().integer().min(1).required(),
        description: Joi.string().required(),
        main_image: Joi.string().required(),
        content_images: Joi.array().items(Joi.string()).required(),
        price: Joi.number().integer().min(1).required(),
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
        title: Joi.string().required(),
        description: Joi.string().required(),
        photos: Joi.array().items(Joi.string()).required(),
        title: Joi.string().required()
    });

const GET_ONE_ROOM_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().min(1).required()
    });

const GET_ALL_NEWS_SCHEMA = Joi.object()
    .keys({
        limit: Joi.number().default(10),
        offset: Joi.number().default(0),
        orderBy: Joi.string().default('id'),
        order: Joi.string()
            .regex(/^(asc|desc)$/)
            .default('asc')
    });

const ADD_NEWS_SCHEMA = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    content: Joi.string().required(),
    main_image: Joi.string(),
    content_images: Joi.array().items(Joi.string()),
    repost: Joi.boolean(),
    period: Joi.number().integer()
});

const GET_ONE_NEWS_SCHEMA = Joi.object()
    .keys({
        id: Joi.number().integer().min(1).required()
    });

const EDIT_NEWS_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().min(1).required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        content: Joi.string().required(),
        main_image: Joi.string(),
        content_images: Joi.array().items(Joi.string()),
        repost: Joi.boolean(),
        period: Joi.number().integer()
    })
    .min(2);

const GET_ALL_FAQ_SCHEMA = Joi.object()
    .keys({

    });

const ADD_FEEDBACK_SCHEMA = Joi
    .object()
    .keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().regex(/^\d+$/).min(10).required(),
        message: Joi.string().required()
    });

const GET_ALL_FEEDBACK_SCHEMA = Joi
    .object()
    .keys({
        limit: Joi.number().integer().min(1).default(10),
        offset: Joi.number().integer().min(0).default(0),
        orderBy: Joi.string().default('id'),
        order: Joi.string().lowercase().valid('asc', 'desc').default('asc')
    });

const GET_ONE_FEEDBACK_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().min(1).required()
    });

const DELETE_FEEDBACK_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().min(1).required()
    });

const SEND_RECOVERY_HASH_SCHEMA = Joi
    .object()
    .keys({
        email: Joi.string().email()
    });

const CHECK_RECOVERY_HASH_SCHEMA = Joi
    .object()
    .keys({
        email: Joi.string().email().required(),
        hash: Joi.string().required()
    });

const SET_NEW_PASSWORD_SCHEMA = Joi
    .object()
    .keys({
        email: Joi.string().email().required(),
        hash: Joi.string().required(),
        password: Joi.string().required()
    });

const EDIT_PAGES_CATEGORY_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().min(1).required(),
        name: Joi.string().required()
    });

const DELETE_PAGES_CATEGORY_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().min(1).required()
    });

const ADD_PAGES_CATEGORY_SCHEMA = Joi
    .object()
    .keys({
        id: Joi.number().integer().min(1).required(),
        name: Joi.string().required()
    });

const GET_ALL_PAGES_CATEGORIES_SCHEMA = Joi
    .object()
    .keys({

    });

module.exports = {
    validate,
    GET_ONE_USER_SCHEMA,
    LOGIN_SCHEMA,
    REGISTER_USER_SCHEMA,
    GET_ALL_HOUSINGS_SCHEMA,
    GET_ALL_SERVICES_SCHEMA,
    GET_ALL_ROOMS_SCHEMA,
    EDIT_HOUSING_SCHEMA,
    ADD_RESERVATION_SCHEMA,
    FIND_USERS_SCHEMA,
    EDIT_ROOM_SCHEMA,
    ADD_PAGE_SCHEMA,
    GET_ONE_PAGE_SCHEMA,
    GET_ALL_USERS_SCHEMA,
    GET_HOUSING_SCHEMA,
    EDIT_USER_SCHEMA,
    EDIT_PAGE_SCHEMA,
    ADD_ROOM_SCHEMA,
    EDIT_RESERVATION_SCHEMA,
    ADD_HOUSING_SCHEMA,
    GET_ONE_ROOM_SCHEMA,
    GET_ALL_INFOS_SCHEMA,
    DELETE_PAGE_SCHEMA,
    GET_ALL_NEWS_SCHEMA,
    ADD_NEWS_SCHEMA,
    GET_ONE_NEWS_SCHEMA,
    EDIT_NEWS_SCHEMA,
    GET_ALL_FAQ_SCHEMA,
    ADD_FEEDBACK_SCHEMA,
    GET_ALL_FEEDBACK_SCHEMA,
    GET_ONE_FEEDBACK_SCHEMA,
    DELETE_FEEDBACK_SCHEMA,
    SEND_RECOVERY_HASH_SCHEMA,
    CHECK_RECOVERY_HASH_SCHEMA,
    SET_NEW_PASSWORD_SCHEMA,
    EDIT_PAGES_CATEGORY_SCHEMA,
    DELETE_PAGES_CATEGORY_SCHEMA,
    ADD_PAGES_CATEGORY_SCHEMA,
    GET_ALL_PAGES_CATEGORIES_SCHEMA
};
