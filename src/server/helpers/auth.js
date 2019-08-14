const jwt = require('jsonwebtoken');
const usersQueries = require('../db/queries/users');

async function updateTokens(id){
    const accessToken = await jwt.sign({ id }, process.env.SECRET_KEY ,{ expiresIn: '1h' });
    const refreshToken = await jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '24h' });
    await usersQueries.signRefreshToken({ id , refreshToken });
    return {
        access_token: accessToken,
        refresh_token: refreshToken
    }
}


async function checkExpireToken(token){
    const decoded = await jwt.decode(token,{complete: true});
    if (!decoded) {
        return [true];
    }
    else {
        const expireTime = decoded.payload.exp;
        const currentTime = Date.now() / 1000;
        if (currentTime >= expireTime){
            return [true];
        }else {
            return [false,decoded.payload.id];
        }
    }
}

async function checkAuth(ctx,next) {
    try {
        const accessToken = ctx.cookies.get('access_token');
        const refreshToken = ctx.cookies.get('refresh_token');
        if (!accessToken && !refreshToken){
            ctx.state.user = null;
        } else if (!accessToken && refreshToken){
            const [ expireRefreshToken , id ] = await checkExpireToken(refreshToken);
            if (expireRefreshToken) {
                ctx.state.user = null;
            } else {
                const user = await usersQueries.getOneUser(id);
                ctx.state.user = user ? user : null;
            }
        } else if (accessToken && !refreshToken){
            ctx.state.user = null;
        } else if (accessToken && refreshToken){
            const [expireAccessToken,id] = await checkExpireToken(accessToken);
            const [expireRefreshToken] = await checkExpireToken(refreshToken);
            if (expireAccessToken && !expireRefreshToken){
                const newTokens = await updateTokens(id);
                ctx.cookies.set('access_token',newTokens.access_token);
                ctx.cookies.set('refresh_token',newTokens.refresh_token);
                ctx.state.user = await usersQueries.getOneUser(id);
            } else if (!expireAccessToken && expireRefreshToken) {
                ctx.state.user = null;
            } else if (expireAccessToken && expireRefreshToken) {
                ctx.state.user = null;
            } else {
                ctx.state.user = await usersQueries.getOneUser(id);
            }
        }
    } catch (error) {
        ctx.state.user = null;
        return next();
    }
}


module.exports = {
    updateTokens,
    checkAuth
}