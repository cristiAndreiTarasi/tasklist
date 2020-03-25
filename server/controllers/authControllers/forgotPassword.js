const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
const User = require('../../models/User');

function forgotPassword (req, res) {
    const { email } = req.body;
    
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: `User with that email does not exist`,
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '30m' });

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
            subject: "Password Reset Link",
            html: `
                <h1>Use the link below to reset your password</h1>
                <p>Please use this link to activate your account</p>
                <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
            `,
        };

        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.status(400).json({
                    message: 'Database connection error on user password forgot request', 
                })
            } else {
                transporter
                    .sendMail(mailOptions)
                    .then(result => {
                        return res.json({
                            message: 'Email was sent. Follow the instructions.',
                        });
                    })
                    .catch(err => {
                        return res.json({
                            message: err.message,
                        });
                    });
            }
        });
    });
}

module.exports = forgotPassword;