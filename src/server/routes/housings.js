const Router = require('koa-router');
const validator = require('../helpers/validator');
const housingsQueries = require('../db/queries/housings');

const router = new Router();

const PREFIX_URL = '/housings';
const GET_HOUSING_URL = `${PREFIX_URL}/getHousing`;

router.post(GET_HOUSING_URL,
  validator.validate(validator.GET_HOUSING_SCHEMA),
  async (ctx) => {
    try {
      const data = ctx.request.body;
      const res = await housingsQueries.getHousing(data.id);
      if (res) {
        ctx.status = 200;
        ctx.body = {
          status: 'OK',
          message: 'Данные о корпусе получены!',
          housing: res,
        };
      } else {
        ctx.status = 404;
        ctx.body = {
          status: 'error',
          message: 'Корпус не найден',
        };
        console.log(ctx.body.message);
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        status: 'error',
        message: 'Внутренняя ошибка сервера.',
      };
      console.log(err);
    }
  });


module.exports = router;
