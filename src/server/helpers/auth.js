const jwt = require('jsonwebtoken');
const usersQueries = require('../db/queries/users');

async function updateTokens(id){
    const accessToken = await jwt.sign({ id }, process.env.SECRET_KEY ,{ expiresIn: '1h' });
    const refreshToken = await jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '24h' });
    await usersQueries.updateUser(id,refreshToken);
    return {
        access_token: accessToken,
        refresh_token: refreshToken
    }
}

async function checkAuth(ctx,next) {
    try {
        const accessToken = ctx.cookies.get('access_token');
        const refreshToken = ctx.cookies.get('refresh_token');
        if (!accessToken && !refreshToken){
            ctx.state.user = null;
        } else if (!accessToken && refreshToken){
            const payload = await jwt.verify(refreshToken,process.env.SECRET_KEY);
            const [user] = await usersQueries.getOneUser({id: payload.id});
            if (user.refresh_token === refreshToken){
                const { access_token, refresh_token } = await updateTokens(user.id);
                ctx.cookies.set('access_token',access_token);
                ctx.cookies.set('refresh_token',refresh_token);
                ctx.state.user = user;
            } else {
                ctx.state.user = null;
            }
        } else if (accessToken && !refreshToken){
            ctx.state.user = null;
        } else if (accessToken && refreshToken){
            const expireAccessToken = false;
            const expireRefreshToken = false;
            let payloadAccessToken = null;
            let payloadRefreshToken = null;
            try {
                payloadAccessToken = await jwt.verify(accessToken,process.env.SECRET_KEY);
            } catch (error) {
                expireAccessToken = true;
            }
            try {
                payloadRefreshToken = await jwt.verify(refreshToken,process.env.SECRET_KEY);
            } catch (error) {
                expireRefreshToken = true;
            }

            if (expireAccessToken && !expireRefreshToken){
                const { access_token, refresh_token } = await updateTokens(payloadRefreshToken.id);
                ctx.state.user = await usersQueries.getOneUser({id: payloadRefreshToken.id});
                ctx.cookies.set('access_token',access_token);
                ctx.cookies.set('refresh_token',refresh_token);
            }
            else if (!expireAccessToken && !expireRefreshToken){
                ctx.state.user = await usersQueries.getOneUser({id: payloadAccessToken.id});
            } else {
                ctx.state.user = null;
            }
        }
        return next();
    } catch (error) {
        ctx.state.user = null;
        return next();
    }
}


module.exports = {
    updateTokens,
    checkAuth
}