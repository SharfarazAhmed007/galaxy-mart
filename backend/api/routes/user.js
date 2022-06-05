const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/register', userController.signup);
router.post('/login', userController.login);
router.put('/profile_update', auth, userController.update_user);

module.exports = router;
