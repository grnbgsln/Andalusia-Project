const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()

let mailTransporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL,
    },
});

module.exports = mailTransporter