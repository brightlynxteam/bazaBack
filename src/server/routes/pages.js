const Router = require('koa-router');
const pagesQueries = require('../db/queries/pages');
const pagesCategoriesQueries = require('../db/queries/pages_categories');
const validator = require('../helpers/validator');
const authHelper = require('../helpers/auth');
const rolesHelper = require('../helpers/roles');

const router = new Router();

const PREFIX_URL = `/pages`;
const GET_ONE_PAGE_URL = `${PREFIX_URL}/getOnePage`;
const GET_ALL_SERVICES_URL = `${PREFIX_URL}/getAllServices`;
const GET_ALL_INFOS_URL = `${PREFIX_URL}/getAllInfos`;
const GET_ALL_FAQ_URL = `${PREFIX_URL}/getAllFAQ`;
const ADD_PAGE_URL = `${PREFIX_URL}/addPage`;
const EDIT_PAGE_URL = `${PREFIX_URL}/editPage`;
const DELETE_PAGE_URL = `${PREFIX_URL}/deletePage`;
const GET_ALL_PAGES_CATEGORIES_URL = `${PREFIX_URL}/getAllCategories`;
const ADD_PAGES_CATEGORY_URL = `${PREFIX_URL}/addCategory`;
const EDIT_PAGES_CATEGORY_URL = `${PREFIX_URL}/editCategory`;
const DELETE_PAGES_CATEGORY_URL = `${PREFIX_URL}/deleteCategory`;

router.post(
    ADD_PAGE_URL,
    validator.validate(validator.ADD_PAGE_SCHEMA),
    async ctx => {
        try {
            let data = ctx.request.body;
            let page = await pagesQueries.addPage(data);
            ctx.status = 200;
            ctx.body = {
                status: 'OK',
                message: 'Страница добавлена',
                data: page
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: 'Error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(error);
        }
    }
);

router.post(GET_ONE_PAGE_URL,
    validator.validate(validator.GET_ONE_PAGE_SCHEMA),
    async (ctx) => {
        try {

            let data = ctx.request.body;
            const resultData = await pagesQueries.getOnePage(data);

            if (resultData) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Страница получена!',
                    data: resultData
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'Error',
                    message: 'Страница не найдена'
                };
            }
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                status: 'Error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(err)
        }
    }
);

router.post(
    GET_ALL_SERVICES_URL,
    validator.validate(validator.GET_ALL_SERVICES_SCHEMA),
    async ctx => {
        try {
            let data = ctx.request.body;
            let services = await pagesQueries.getAllServices(data);
            ctx.status = 200;
            ctx.body = {
                status: 'OK',
                message: 'Список услуг получен',
                data: services.result,
                total: services.total
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: 'Error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(error);
        }
    }
);

router.post(
    GET_ALL_INFOS_URL,
    validator.validate(validator.GET_ALL_INFOS_SCHEMA),
    async ctx => {
        try {
            let data = ctx.request.body;
            let infos = await pagesQueries.getAllInfos(data);
            ctx.status = 200;
            ctx.body = {
                status: 'OK',
                message: 'Список информации получен',
                data: infos.result,
                total: infos.total
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: 'Error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(error);
        }
    }
);

router.post(
    GET_ALL_FAQ_URL,
    validator.validate(validator.GET_ALL_FAQ_SCHEMA),
    async ctx => {
        try {
            let faq = await pagesQueries.getAllFAQ();
            ctx.status = 200;
            ctx.body = {
                status: 'OK',
                message: 'FAQ получены',
                data: faq
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: 'Error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(error);
        }
    }
);

router.post(EDIT_PAGE_URL,
    validator.validate(validator.EDIT_PAGE_SCHEMA),
    authHelper.checkAuth,
    rolesHelper.isAdmin,
    async (ctx) => {

        try {
            let data = ctx.request.body;
            let res = await pagesQueries.editPage(data);

            if (res) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Страница изменена!',
                    data: res
                };
            } else {
                ctx.status = 400;
                ctx.body = {
                    status: 'error',
                    message: 'Некpageорректные данные'
                };
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

router.post(DELETE_PAGE_URL,
    validator.validate(validator.DELETE_PAGE_SCHEMA),
    async (ctx) => {
        try {

            let data = ctx.request.body;
            const resultData = await pagesQueries.deletePage(data);

            if (resultData) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Страница удалена!'
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'Error',
                    message: 'Страница не найдена'
                };
            }
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                status: 'Error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(err)
        }
    }
);

router.post(EDIT_PAGES_CATEGORY_URL,
    validator.validate(validator.EDIT_PAGES_CATEGORY_SCHEMA),
    authHelper.checkAuth,
    rolesHelper.isAdmin,
    async (ctx) => {

        try {
            let data = ctx.request.body;
            let res = await pagesCategoriesQueries.editPagesCategory(data);

            if (res) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Категория изменена!',
                    data: res
                };
            } else {
                ctx.status = 400;
                ctx.body = {
                    status: 'error',
                    message: 'Некpageорректные данные'
                };
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

router.post(DELETE_PAGES_CATEGORY_URL,
    validator.validate(validator.DELETE_PAGES_CATEGORY_SCHEMA),
    authHelper.checkAuth,
    rolesHelper.isAdmin,
    async (ctx) => {
        try {

            let id = ctx.request.body.id;
            const resultData = await pagesCategoriesQueries.deletePagesCategory(id);

            if (resultData) {
                ctx.status = 200;
                ctx.body = {
                    status: 'OK',
                    message: 'Категория удалена!'
                };
            } else {
                ctx.status = 404;
                ctx.body = {
                    status: 'Error',
                    message: 'Страница не найдена'
                };
            }
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                status: 'Error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(err)
        }
    }
);

router.post(
    ADD_PAGES_CATEGORY_URL,
    validator.validate(validator.ADD_PAGES_CATEGORY_SCHEMA),
    authHelper.checkAuth,
    rolesHelper.isAdmin,
    async ctx => {
        try {
            let name = ctx.request.body.name;
            let category = await pagesCategoriesQueries.addPagesCategory(name);
            ctx.status = 200;
            ctx.body = {
                status: 'OK',
                message: 'Категория добавлена',
                data: category
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: 'Error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(error);
        }
    }
);

router.post(
    GET_ALL_PAGES_CATEGORIES_URL,
    validator.validate(validator.GET_ALL_PAGES_CATEGORIES_SCHEMA),
    async ctx => {
        try {
            let categories = await pagesCategoriesQueries.getAllPagesCategories();
            ctx.status = 200;
            ctx.body = {
                status: 'OK',
                message: 'Список категорий получен',
                data: categories
            };
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                status: 'Error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(error);
        }
    }
);

module.exports = router;
