const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const formidable = require('koa2-formidable');
const cors = require('koa2-cors');
const logger = require('koa-logger');
const app = new Koa();
const t = require("./helpers/auth");
const jwt = require('jsonwebtoken');

async function test(){
  const token = await jwt.sign({id: 2},'ehlo',{expiresIn: '24h'});
  const res = await t.checkExpireToken('sdfsdf');
  console.log(res);
}
test();

app.use(logger());

app.use(
  cors({
    credentials: true
  })
);

app.use(formidable({ multiples: true }));
app.use(bodyParser());//<<<<<< fixes#25

const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const pagesRoutes = require('./routes/pages');
const housingsRoutes = require('./routes/housings');
const servicesRoutes = require('./routes/services');
const roomsRoutes = require('./routes/rooms');
const reservationRoutes = require('./routes/reservation');

app.use(usersRoutes.routes());
app.use(authRoutes.routes());
app.use(pagesRoutes.routes());
app.use(housingsRoutes.routes());
app.use(servicesRoutes.routes());
app.use(roomsRoutes.routes());
app.use(reservationRoutes.routes());

let port = 13579;

const server = app.listen(port, () => {
  console.log(`Server backend listening on port: ${port}`);
});

module.exports = {
  server
};
