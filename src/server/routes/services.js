const Router = require('koa-router');
const validator = require('../helpers/validator');
const servicesQueries = require('../db/queries/services');
const router = new Router();

const PREFIX_URL = '/services';
const GET_ALL_SERVICES_URL = `${PREFIX_URL}/getAllServices`;

router.post(
  GET_ALL_SERVICES_URL,
  validator.validate(validator.GET_ALL_SERVICES_SCHEMA),
  async ctx => {
    try {
      let data = ctx.request.body;
      let services = await servicesQueries.getAllServices(data);
      ctx.status = 200;
      ctx.body = {
        status: 'OK',
        message: 'Данные об услугах получены!',
        services
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
