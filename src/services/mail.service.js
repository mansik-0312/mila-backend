const nodemailer = require("nodemailer");
const env = require("../config/env");

const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: Number(env.EMAIL_PORT),
    secure: false,
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD,
    },
});

const sendMail = async ({ to, subject, html }) => {
    return await transporter.sendMail({
        from: env.EMAIL_FROM,
        to,
        subject,
        html,
    });
};

module.exports = {
    sendMail,
};