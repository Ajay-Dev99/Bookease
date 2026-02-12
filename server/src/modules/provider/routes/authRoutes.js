const express = require('express');
const authController = require('../controller/authController');
const createUploader = require('../../../middleware/upload');

const router = express.Router();
const uploadProvider = createUploader('bookease/providers');

router.post('/signup', uploadProvider.single('profileImage'), authController.signup);
router.post('/login', authController.login);

module.exports = router;
