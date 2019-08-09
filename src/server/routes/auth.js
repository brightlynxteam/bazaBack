const Router = require('koa-router');
const validator = require('../helpers/validator');
const usersQueries = require('../db/queries/users');

const router = new Router();

const PREFIX_URL = '/auth';
const GET_ONE_USER_URL = `${PREFIX_URL}/login`;

router.post(GET_ONE_USER_URL,
    validator.validate(validator.LOGIN_SCHEMA),
    async (ctx) => {

        try {
            let data = ctx.request.body;
            let res = await usersQueries.getOneUser(data);
            if (res) {
                ctx.status = 200;
                ctx.body = {
                    status: 'success',
                    message: '������������ ���������!',
                    data: res
                };
            } else {
                ctx.status = 401;
                ctx.body = {
                    status: 'error',
                    message: '�������� ������!'
                }
            }
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                status: 'error',
                message: '���������� ������ �������.'
            };
            console.log(err)
        }
    });


module.exports = router;
