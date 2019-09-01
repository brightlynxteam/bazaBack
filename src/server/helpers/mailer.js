const nodemailer = require('nodemailer');
const axios = require('axios');

const FROM = 'База отдыха Хуторок'

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'hutoroktest',
        pass: 'hutorok11235813'
    }
});

async function sendEmail(to, subject, message) {
    let mail = {
        from: FROM,
        to: to,
        subject: subject,
        html: message
    };
    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error(error);
    }
}

async function getShortLink(url) {
    try {
        const response = await axios({
            method: 'get',
            url: `https://clck.ru/--?url=${url}`
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function sendRecoveryHash(to, hash) {
    const link = await getShortLink(encodeURIComponent(`http://hutorok.ru/recovery?email=${to}&hash=${hash}`));
    const subject = 'Восстановление пароля';
    const message = `Это сообщение сгенерировано, потому что кто-то указал Ваш адрес электронной почты для восстановления доступа к сайту базы отдыха Хуторок. Для продолжения перейдите по <a href="${link}">ссылке</a>. Если Вы не понимаете о чем идет речь, просто проигнорируйте это сообщение.`;
    const mail = {
        from: FROM,
        to: to,
        subject: subject,
        html: message
    };
    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    sendEmail,
    getShortLink,
    sendRecoveryHash
};