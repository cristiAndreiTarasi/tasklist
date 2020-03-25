const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
const User = require('../../models/User');


async function signup (req, res) {
    const { name, email, password } = req.body;

    await User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                message: `User is taken`,
            });
        }
    });

    const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '30m' });

    let transporter = nodemailer.createTransport({
        service: 'Mailgun',
        // host: 'smtp.mailgun.org',
        // port: 587,
        auth: {
            user: process.env.USERNAME,
            pass: process.env.USER_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Hello ✔",
        text: "Hello world?",
        html: `
            <h1>Account activation</h1>
            <p>Please use this link to activate your account</p>
            <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
        `
    };

    await transporter.sendMail(mailOptions)
        .then(result => {
            return res.json({
                message: 'Email was sent. Follow the instructions.',
            });
        })
        .catch(err => {
            return res.json({
                message: err.message,
            })
        });
};

module.exports = signup;