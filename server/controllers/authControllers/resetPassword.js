const jwt = require('jsonwebtoken');
const lodash = require('lodash');
require('dotenv').config();
const User = require('../../models/User');

function resetPassword (req, res) {
    const { resetPasswordLink, newPassword } = req.body;

    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    message: `Expired link. Try again.`,
                });
            }

            User.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        message: 'Something went wrong. Try again.',
                    });
                }

                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: '',
                };

                user = lodash.extend(user, updatedFields);
                // user = { ...user, ...updatedFields };

                user.save((err, user) => {
                    if (err) {
                        return res.status(401).json({
                            message: `Error resetting user password.: ${err}`,
                        });
                    }

                    res.status(201).json({
                        message: `Great! Now you can login with your new password.`,
                    });
                })
            });
        });
    }
}

module.exports = resetPassword;