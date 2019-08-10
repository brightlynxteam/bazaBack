const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const formidable = require('koa2-formidable');
const cors = require('koa2-cors');
const logger = require('koa-logger');
const app = new Koa();

app.use(logger());

app.use(cors({
    credentials: true
}));

app.use(formidable({multiples: true}));
app.use(bodyParser());

const usersRoutes = require('./routes/users');
const reservationRoutes = require('./routes/reservation')
app.use(usersRoutes.routes());
app.use(reservationRoutes.routes());

let port = 13579;

const server = app.listen(port, () => {
   console.log(`Server backend listening on port: ${port}`);
});

module.exports = {
    server,
};
