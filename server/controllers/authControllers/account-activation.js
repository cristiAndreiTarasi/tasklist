const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../../models/User');

function accountActivation (req, res) {
    const { token } = req.body;

    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Expired link. Signup again.',
                });
            }
        });

        const { name, email, password } = jwt.decode(token);

        new User({ name, email, password, })
            .save((err, user) => {
                if (err) {
                    return res.status(401).json({
                        message: `Error saving user in database.: ${err}`,
                    });
                }

                return res.status(201).json({
                    message: `User successfuly added`,
                });
            });
    } else {
        return res.status(201).json({
            message: `Something went wrong. Try again.`,
        });
    }
};

module.exports = accountActivation;