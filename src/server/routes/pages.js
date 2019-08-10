const Router = require('koa-router');
const validator = require('../helpers/validator');
const pagesQueries = require('../db/queries/pages');
const router = new Router();

const PREFIX_URL = '/pages';
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

module.exports = router;
