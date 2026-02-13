const express = require('express');
const providerAuthRoutes = require('../modules/provider/routes/authRoutes');
const userAuthRoutes = require('../modules/user/routes/authRoutes');
const serviceRoutes = require('../modules/services/routes/serviceRoutes');
const bookingRoutes = require('../modules/bookings/routes/bookingRoutes');

const router = express.Router();

router.use('/provider/auth', providerAuthRoutes);
router.use('/user/auth', userAuthRoutes);
router.use('/services', serviceRoutes);
router.use('/bookings', bookingRoutes);

module.exports = router;
