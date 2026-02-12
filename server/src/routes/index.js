const express = require('express');
const providerAuthRoutes = require('../modules/provider/routes/authRoutes');
const serviceRoutes = require('../modules/services/routes/serviceRoutes');

const router = express.Router();

router.use('/provider/auth', providerAuthRoutes);
router.use('/services', serviceRoutes);

module.exports = router;
