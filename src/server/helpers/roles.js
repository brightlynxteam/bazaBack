function isEmpty(obj) {
  for (key in obj) {
    if (key in obj) return false;
  }

  return true;
}

function isAdmin(ctx, next) {
  if (!isEmpty(ctx.state.user) && ctx.state.user.isAdmin)
    return next();

  ctx.status = 403;
  ctx.body = {
    status: 'error',
    message: 'Доступ запрещен!'
  };

  retrun;
}

function isUser(ctx, next) {
  if (!isEmpty(ctx.state.user)) return next();

  ctx.status = 403;
  ctx.body = {
    status: 'error',
    message: 'Доступ запрещен!'
  };

  return;
}

module.exports = {
  isAdmin,
  isUser
}
