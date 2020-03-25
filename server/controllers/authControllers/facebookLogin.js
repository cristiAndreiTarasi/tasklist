require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const fetch = require('node-fetch');

function facebookLogin (req, res) {
    console.log(req.body.response);
    const { userID, accessToken } = req.body;
    const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken},`;

    return (
        fetch(url, {
            method: 'GET'
        }).then(response => response.json())
        .then(response => {
            const { email, name } = response;

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
                            console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err);
                            return res.status(400).json({
                                message: 'User signup with facebook has failed',
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
        }).catch(error => {
            return res.status(400).json({
                message: 'Facebook login has failed. Try again.',
            });
        })
    );
}

module.exports = facebookLogin;