const Router = require('koa-router');
const validator = require('../helpers/validator');
const pagesQueries = require('../db/queries/pages');
const router = new Router();

const PREFIX_URL = '/pages';
const GET_ALL_PAGES_URL = `${PREFIX_URL}/getAllPages`;
const ADD_PAGE_URL = `${PREFIX_URL}/addPage`;

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
        page
        };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        status: 'Error',
        message: 'Внутренняя ошибка сервера.'
      };
    }
  }
);

router.post(
  GET_ALL_PAGES_URL,
  validator.validate(validator.GET_ALL_PAGES_SCHEMA),
  async ctx => {
    try {
      let data = ctx.request.body;
      let pages = await pagesQueries.getAllPages(data);
      ctx.status = 200;
      ctx.body = {
        status: 'OK',
        message: 'Страницы получены',
        pages
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        status: 'Error',
        message: 'Внутренняя ошибка сервера.'
      };
    }
  }
);

module.exports = router;