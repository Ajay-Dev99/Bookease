const express = require('express');
const bookingController = require('../controller/bookingController');
// User Auth Middleware
const { protect, protectProvider } = require('../../../middleware/authMiddleware');

const router = express.Router();

// -- Provider Routes (Specific) --
router.get('/provider-stats', protectProvider, bookingController.getProviderStats);


// -- User Routes (General) --
// All routes below are protected for Users
router.use(protect);

// Get My Appointments
router.get('/my-appointments', bookingController.getMyAppointments);

// Cancel Booking
router.patch('/:bookingId/cancel', bookingController.cancelBooking);

// Create Booking
router.post('/', bookingController.createBooking);

module.exports = router;
