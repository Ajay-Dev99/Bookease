const express = require('express');
const providerController = require('../controller/providerController');

const router = express.Router();

router.get('/', providerController.getAllProviders);
router.get('/:id', providerController.getProvider);

module.exports = router;
