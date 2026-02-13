const express = require('express');
const bookingController = require('../controller/bookingController');
const { protect, protectProvider } = require('../../../middleware/authMiddleware');

const router = express.Router();

// Provider routes
router.get('/provider-stats', protectProvider, bookingController.getProviderStats);
router.get('/provider-bookings', protectProvider, bookingController.getProviderBookings);
router.patch('/:bookingId/status', protectProvider, bookingController.updateBookingStatus);

// Customer routes (protected)
router.use(protect);

router.get('/my-appointments', bookingController.getMyAppointments);
router.patch('/:bookingId/cancel', bookingController.cancelBooking);
router.post('/', bookingController.createBooking);

module.exports = router;
