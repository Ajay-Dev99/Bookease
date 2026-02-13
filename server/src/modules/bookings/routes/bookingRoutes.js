const express = require('express');
const bookingController = require('../controller/bookingController');
const { protect } = require('../../../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/', bookingController.createBooking);

module.exports = router;
