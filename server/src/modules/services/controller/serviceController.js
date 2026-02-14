const mongoose = require('mongoose');
const Service = require('../model/serviceModel');
const Provider = require('../../provider/model/providerModel');
const BlockedDate = require('../model/blockedDateModel');
const CustomAvailability = require('../model/customAvailabilityModel');
const { getAvailableSlots } = require('../utils/availabilityHelper');
const AppError = require('../../../utils/AppError');

// Create a new service with schedule
exports.createService = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let { name, description, duration, price, schedule, slotDuration, maxBookingsPerSlot } = req.body;
        const providerId = req.user._id;

        // Parse schedule if it's a string
        if (typeof schedule === 'string') {
            try {
                schedule = JSON.parse(schedule);
            } catch (e) {
                throw new AppError('Invalid JSON format for schedule', 400);
            }
        }

        // Handle image uploads
        let images = [];
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => file.path);
        }

        // Create the service with schedule
        const newService = new Service({
            name,
            description,
            duration,
            price,
            provider: providerId,
            images,
            schedule: schedule || undefined, // Use default if not provided
            slotDuration: slotDuration || 60,
            maxBookingsPerSlot: maxBookingsPerSlot || 1,
            isActive: true
        });

        await newService.save({ session });

        // Add service to provider's services array
        await Provider.findByIdAndUpdate(
            providerId,
            { $push: { services: newService._id } },
            { session }
        );

        await session.commitTransaction();

        res.status(201).json({
            status: 'success',
            data: {
                service: newService
            }
        });

    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
};

// Get all services with their schedules
exports.getServices = async (req, res, next) => {
    try {
        const services = await Service.find({ isActive: true })
            .populate({
                path: 'provider',
                select: 'name email profileImage address about'
            });

        res.status(200).json({
            status: 'success',
            results: services.length,
            data: {
                services
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get a single service with full details
exports.getService = async (req, res, next) => {
    try {
        const { serviceId } = req.params;

        const service = await Service.findById(serviceId)
            .populate({
                path: 'provider',
                select: 'name email profileImage address about phoneNumber'
            });

        if (!service) {
            return next(new AppError('Service not found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                service
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get all services for the logged-in provider
exports.getProviderServices = async (req, res, next) => {
    try {
        const providerId = req.user._id;

        const services = await Service.find({ provider: providerId })
            .sort({ createdAt: -1 }); // Newest first

        res.status(200).json({
            status: 'success',
            results: services.length,
            data: {
                services
            }
        });
    } catch (error) {
        next(error);
    }
};

// Update service (including schedule)
exports.updateService = async (req, res, next) => {
    try {
        const { serviceId } = req.params;
        const providerId = req.user._id;

        const service = await Service.findOne({ _id: serviceId, provider: providerId });

        if (!service) {
            return next(new AppError('Service not found or you do not have permission to edit it', 404));
        }

        // Allowed updates including schedule
        const allowedUpdates = ['name', 'description', 'duration', 'price', 'schedule', 'slotDuration', 'maxBookingsPerSlot', 'isActive'];
        allowedUpdates.forEach(update => {
            if (req.body[update] !== undefined) {
                // Parse schedule if it's a string (which it will be if sent via FormData)
                if (update === 'schedule' && typeof req.body[update] === 'string') {
                    try {
                        service[update] = JSON.parse(req.body[update]);
                    } catch (e) {
                        // If parsing fails, it might be raw object or invalid, let mongoose validation handle or throw error
                        console.error("Error parsing schedule JSON", e);
                    }
                } else {
                    service[update] = req.body[update];
                }
            }
        });

        // Handle image uploads
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => file.path);
            service.images = [...service.images, ...newImages];
        }

        // Handle image removal
        // Handle image removal
        if (req.body.removeImages) {
            let removeList = req.body.removeImages;
            // Check if it's a string that needs parsing (e.g. "[\"url1\", \"url2\"]")
            if (typeof removeList === 'string') {
                try {
                    const parsed = JSON.parse(removeList);
                    if (Array.isArray(parsed)) {
                        removeList = parsed;
                    } else {
                        // If it's a simple string (one url), wrap in array
                        removeList = [removeList];
                    }
                } catch (e) {
                    // If not JSON, treat as single string URL
                    removeList = [removeList];
                }
            }
            service.images = service.images.filter(img => !removeList.includes(img));
        }

        await service.save();

        res.status(200).json({
            status: 'success',
            data: {
                service
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get available slots for a service on a specific date
exports.getServiceAvailability = async (req, res, next) => {
    try {
        const { serviceId } = req.params;
        const { date } = req.query;

        if (!date) {
            return next(new AppError('Please provide a date', 400));
        }

        const requestedDate = new Date(date);
        if (isNaN(requestedDate.getTime())) {
            return next(new AppError('Invalid date format', 400));
        }

        const service = await Service.findById(serviceId);
        if (!service) {
            return next(new AppError('Service not found', 404));
        }

        const availableSlots = await getAvailableSlots(serviceId, requestedDate);

        res.status(200).json({
            status: 'success',
            data: {
                date: requestedDate,
                service: {
                    id: service._id,
                    name: service.name,
                    duration: service.duration,
                    slotDuration: service.slotDuration
                },
                slots: availableSlots
            }
        });
    } catch (error) {
        next(error);
    }
};

// Block dates for a service
exports.blockServiceDates = async (req, res, next) => {
    try {
        const { serviceId } = req.params;
        const providerId = req.user._id;
        const { date, startTime, endTime, reason, isRecurring, recurringPattern, recurringEndDate } = req.body;

        // Verify service belongs to provider
        const service = await Service.findOne({ _id: serviceId, provider: providerId });
        if (!service) {
            return next(new AppError('Service not found or you do not have permission', 404));
        }

        const blockedDate = new BlockedDate({
            service: serviceId,
            date: new Date(date),
            startTime: startTime || null,
            endTime: endTime || null,
            reason: reason || 'Unavailable',
            isRecurring: isRecurring || false,
            recurringPattern: recurringPattern || null,
            recurringEndDate: recurringEndDate ? new Date(recurringEndDate) : null
        });

        await blockedDate.save();

        res.status(201).json({
            status: 'success',
            data: {
                blockedDate
            }
        });
    } catch (error) {
        next(error);
    }
};

// Remove blocked date
exports.removeBlockedDate = async (req, res, next) => {
    try {
        const { serviceId, blockId } = req.params;
        const providerId = req.user._id;

        // Verify service belongs to provider
        const service = await Service.findOne({ _id: serviceId, provider: providerId });
        if (!service) {
            return next(new AppError('Service not found or you do not have permission', 404));
        }

        const blockedDate = await BlockedDate.findOneAndDelete({
            _id: blockId,
            service: serviceId
        });

        if (!blockedDate) {
            return next(new AppError('Blocked date not found', 404));
        }

        res.status(200).json({
            status: 'success',
            message: 'Blocked date removed successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Get blocked dates for a service
exports.getBlockedDates = async (req, res, next) => {
    try {
        const { serviceId } = req.params;

        const blockedDates = await BlockedDate.find({
            service: serviceId,
            date: { $gte: new Date() }
        }).sort({ date: 1 });

        res.status(200).json({
            status: 'success',
            results: blockedDates.length,
            data: {
                blockedDates
            }
        });
    } catch (error) {
        next(error);
    }
};

// Set custom availability for a service
exports.setCustomAvailability = async (req, res, next) => {
    try {
        const { serviceId } = req.params;
        const providerId = req.user._id;
        const { date, startTime, endTime, reason } = req.body;

        // Verify service belongs to provider
        const service = await Service.findOne({ _id: serviceId, provider: providerId });
        if (!service) {
            return next(new AppError('Service not found or you do not have permission', 404));
        }

        const customAvailability = new CustomAvailability({
            service: serviceId,
            date: new Date(date),
            startTime,
            endTime,
            reason: reason || 'Special hours'
        });

        await customAvailability.save();

        res.status(201).json({
            status: 'success',
            data: {
                customAvailability
            }
        });
    } catch (error) {
        next(error);
    }
};

// Delete service
exports.deleteService = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { serviceId } = req.params;
        const providerId = req.user._id;

        const service = await Service.findOne({ _id: serviceId, provider: providerId });
        if (!service) {
            return next(new AppError('Service not found or you do not have permission', 404));
        }

        // Soft delete - just mark as inactive
        service.isActive = false;
        await service.save({ session });

        // Remove from provider's services array
        await Provider.findByIdAndUpdate(
            providerId,
            { $pull: { services: serviceId } },
            { session }
        );

        await session.commitTransaction();

        res.status(200).json({
            status: 'success',
            message: 'Service deleted successfully'
        });
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
};

module.exports = exports;
