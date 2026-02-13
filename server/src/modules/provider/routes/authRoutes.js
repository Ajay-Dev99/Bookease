const express = require('express');
const authController = require('../controller/authController');
const createUploader = require('../../../middleware/upload');

const router = express.Router();
const uploadProvider = createUploader('bookease/providers');
const { protectProvider } = require('../../../middleware/authMiddleware');

router.post('/signup', uploadProvider.single('profileImage'), authController.signup);
router.post('/login', authController.login);

// Protected routes
router.patch('/update-profile', protectProvider, uploadProvider.single('profileImage'), authController.updateProfile);
router.get('/reports', protectProvider, authController.getProviderReports);

module.exports = router;
