const express = require('express');
const providerAuthRoutes = require('../modules/provider/routes/authRoutes');

const router = express.Router();

router.use('/provider/auth', providerAuthRoutes);

module.exports = router;
