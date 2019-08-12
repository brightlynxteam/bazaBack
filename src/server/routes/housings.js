const Router = require('koa-router');
const validator = require('../helpers/validator');
const housingsQueries = require('../db/queries/housings');
const router = new Router();

const PREFIX_URL = '/housings';
const GET_ALL_HOUSINGS_URL = `${PREFIX_URL}/getAllHousings`;

router.post(
  GET_ALL_HOUSINGS_URL,
  validator.validate(validator.GET_ALL_HOUSINGS_SCHEMA),
  async ctx => {
    try {
      let data = ctx.request.body;
      let housings = await housingsQueries.getAllHousings(data);
      ctx.status = 200;
      ctx.body = {
        status: 'OK',
        message: 'Данные о корпусах получены!',
        housings
      };
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        status: 'Error',
        message: 'Внутренняя ошибка сервера.'
      };
    }
  }
);

module.exports = router;
