const express = require('express');
const serviceController = require('../controller/serviceController');
const createUploader = require('../../../middleware/upload');
const router = express.Router();
const uploadService = createUploader('bookease/services');


router.get('/', serviceController.getServices);
router.post('/', uploadService.array('images', 5), serviceController.createService);

module.exports = router;
