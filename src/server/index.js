const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const formidable = require('koa2-formidable');
const cors = require('koa2-cors');
const logger = require('koa-logger');
const app = new Koa();

app.use(logger());

app.use(
  cors({
    credentials: true
  })
);

app.use(formidable({ multiples: true }));
app.use(bodyParser());

const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const pagesRoutes = require('./routes/pages');
const housingsRoutes = require('./routes/housings');
const servicesRoutes = require('./routes/services');

app.use(usersRoutes.routes());
app.use(authRoutes.routes());
app.use(pagesRoutes.routes());
app.use(housingsRoutes.routes());
app.use(servicesRoutes.routes());

let port = 13579;

const server = app.listen(port, () => {
  console.log(`Server backend listening on port: ${port}`);
});

module.exports = {
  server
};
