const Router = require('koa-router');
const queries = require('../db/queries/pages');

const router = new Router();

const PREFIX_URL = `/pages`;
const GET_PAGE_URL = PREFIX_URL + '/getPage';

router.post(GET_PAGE_URL,
    async(ctx) => {
        try {

            let dataObj = ctx.request.body;
            let id = null;

            if (dataObj.hasOwnProperty("id")) {
                id = dataObj.id;

                if (typeof(id) == typeof (0)) {

                    const resultData = await queries.getPage(id);

                    if (resultData.length != 0) {
                        ctx.status = 200;
                        ctx.body = {
                            status: 'OK',
                            message: 'Страница получена!',
                            page: resultData[0]
                        };
                    } else {
                        ctx.status = 404;
                        ctx.body = {
                            status: 'Error',
                            message: 'Страница не найдена'
                        };
                    }
                } else {
                    ctx.status = 400;
                    ctx.body = {
                        status: 'Error',
                        message: 'Полe id не число'
                    };
                }
            } else {
                ctx.status = 400;
                ctx.body = {
                    status: 'Error',
                    message: 'Поля id не существует'
                };
            }
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                status: 'error',
                message: 'Внутренняя ошибка сервера.'
            };
            console.log(err)
        }
    }
);

module.exports = router;
const validator = require('../helpers/validator');
const pagesQueries = require('../db/queries/pages');
const router = new Router();

const PREFIX_URL = '/pages';
const GET_ALL_PAGES_URL = `${PREFIX_URL}/getAllPages`;

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
