const express = require('express');
const serviceController = require('../controller/serviceController');
const createUploader = require('../../../middleware/upload');
const { protectProvider } = require('../../../middleware/authMiddleware');

const router = express.Router();
const uploadService = createUploader('bookease/services');

// Public routes
router.get('/', serviceController.getServices);

// Protected routes (provider only) - MUST come before /:serviceId
router.get('/my-services', protectProvider, serviceController.getProviderServices);
router.post('/', protectProvider, uploadService.array('images', 5), serviceController.createService);

// Public routes with parameters - MUST come after specific routes
router.get('/:serviceId', serviceController.getService);
router.get('/:serviceId/availability', serviceController.getServiceAvailability);
router.get('/:serviceId/blocked-dates', serviceController.getBlockedDates);

// Protected routes with parameters
router.patch('/:serviceId', protectProvider, uploadService.array('images', 5), serviceController.updateService);
router.delete('/:serviceId', protectProvider, serviceController.deleteService);

// Availability management routes (provider only)
router.post('/:serviceId/blocked-dates', protectProvider, serviceController.blockServiceDates);
router.delete('/:serviceId/blocked-dates/:blockId', protectProvider, serviceController.removeBlockedDate);
router.post('/:serviceId/custom-availability', protectProvider, serviceController.setCustomAvailability);

module.exports = router;
