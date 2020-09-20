const { Router } = require('express');
const authController = require('../controllers/auth-controller');
const router = Router();

// define function for signup in controller file
router.get('/signup', authController.signup_get);

router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);

router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);

module.exports = router;

