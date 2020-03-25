const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../../models/User');


function signin (req, res) {
    const { email, password } = req.body;

    User.findOne({ email })
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    text: `User does not exist. Create an account.`,
                });
            }

            if (!user.authenticate(password)) {
                return res.status(400).json({
                    text: `Email and password do not match.`,
                })
            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            const { _id, name, email, role } = user;

            return res.json({
                token, 
                user: { _id, name, email, role },
            });
        });
};

module.exports = signin;