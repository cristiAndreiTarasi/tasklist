const router = require('express').Router();
const signup = require('../controllers/authControllers/signup');
const accountActivation = require('../controllers/authControllers/account-activation');
const signin = require('../controllers/authControllers/signin');
const forgotPassword = require('../controllers/authControllers/forgotPassword');
const resetPassword = require('../controllers/authControllers/resetPassword');
const googleLogin = require('../controllers/authControllers/googleLogin');
const facebookLogin = require('../controllers/authControllers/facebookLogin');

router.post('/signup', signup);
router.post('/account-activation', accountActivation);
router.post('/signin', signin);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);

router.post('/google-login', googleLogin);
router.post('/facebook-login', facebookLogin);

module.exports = router;