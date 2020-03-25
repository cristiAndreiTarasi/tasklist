
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require('../../models/User');

function googleLogin (req, res) {
    const { idToken } = req.body;

    client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
        .then(response => {
            const { email_verified, name, email } = response.payload;

            if (email_verified) {
                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); 
                        const { _id, email, name, role } = user;

                        return res.json({
                            token,
                            user: { _id, email, name, role },
                        });
                    } else {
                        let password = email + process.env.JWT_SECRET;

                        user = new User({ name, email, password });
                        user.save((err, data) => {
                            if (err) {
                                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                                return res.status(400).json({
                                    message: 'User signup with google has failed',
                                });
                            }

                            const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); 
                            const { _id, email, name, role } = data;

                            return res.json({
                                token,
                                user: { _id, email, name, role },
                            });
                        });
                    }
                });
            } else {
                return res.status(400).json({
                    message: 'Google login has failed. Try again.',
                });
            }
        }).catch(error => {
            return res.status(400).json({
                message: 'Google login has failed. Try again.',
            });
        });
}

module.exports = googleLogin;