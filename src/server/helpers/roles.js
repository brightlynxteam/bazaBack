function isAdmin(ctx, next) {

    if (ctx.state.user && ctx.state.user.isAdmin)
        return next();

    ctx.status = 403;
    ctx.body = {
        status: 'error',
        message: 'Доступ запрещен!'
    };

    return;
}

function isUser(ctx, next) {
    if (ctx.state.user) return next();

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
};
