const Booking = require('../model/bookingModel');
const Service = require('../../services/model/serviceModel');
const { isSlotAvailable } = require('../../services/utils/availabilityHelper');
const AppError = require('../../../utils/AppError');
const mongoose = require('mongoose');

// Create a new booking
exports.createBooking = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { serviceId, date, time } = req.body;
        const userId = req.user._id;

        // Get the service
        const service = await Service.findById(serviceId).populate('provider');
        if (!service || !service.isActive) {
            throw new AppError('Service not found or inactive', 404);
        }

        const providerId = service.provider._id;

        // Validate date
        const bookingDate = new Date(date);
        if (isNaN(bookingDate.getTime())) {
            throw new AppError('Invalid date format', 400);
        }

        // Check if date is in the past
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        if (bookingDate < now) {
            throw new AppError('Cannot book appointments in the past', 400);
        }

        // Check if slot is available using the availability helper
        const slotAvailable = await isSlotAvailable(serviceId, bookingDate, time);
        if (!slotAvailable) {
            throw new AppError('This time slot is not available', 400);
        }

        // Check for existing non-cancelled booking at this exact time
        const existingBooking = await Booking.findOne({
            service: serviceId,
            date: bookingDate,
            startTime: time,
            status: { $ne: 'cancelled' }
        });

        if (existingBooking) {
            throw new AppError('Slot already booked', 400);
        }

        // Create the booking
        const newBooking = (await Booking.create([{
            user: userId,
            provider: providerId,
            service: serviceId,
            date: bookingDate,
            startTime: time,
            status: 'booked'
        }], { session }))[0];

        await session.commitTransaction();

        // Populate the booking for response
        const populatedBooking = await Booking.findById(newBooking._id)
            .populate('service', 'name duration price')
            .populate('provider', 'name email phoneNumber address');

        res.status(201).json({
            status: 'success',
            data: {
                booking: populatedBooking
            }
        });

    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
};

// Cancel a booking
exports.cancelBooking = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { bookingId } = req.params;
        const userId = req.user._id;

        const booking = await Booking.findOne({ _id: bookingId, user: userId });

        if (!booking) {
            throw new AppError('Booking not found or you are not authorized to cancel it', 404);
        }

        if (booking.status === 'cancelled') {
            throw new AppError('Booking is already cancelled', 400);
        }

        if (booking.status === 'completed') {
            throw new AppError('Cannot cancel completed appointments', 400);
        }

        // Check if appointment is in the past
        const [hours, minutes] = booking.startTime.split(':');
        const appointmentTime = new Date(booking.date);
        appointmentTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        if (new Date() >= appointmentTime) {
            throw new AppError('Cannot cancel past or ongoing appointments', 400);
        }

        booking.status = 'cancelled';
        await booking.save({ session });

        await session.commitTransaction();

        res.status(200).json({
            status: 'success',
            message: 'Booking cancelled successfully'
        });

    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
};

// Get user's appointments
exports.getMyAppointments = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const now = new Date();

        const todayStart = new Date(now);
        todayStart.setHours(0, 0, 0, 0);

        const currentHours = now.getHours().toString().padStart(2, '0');
        const currentMinutes = now.getMinutes().toString().padStart(2, '0');
        const currentTimeString = `${currentHours}:${currentMinutes}`;

        const appointments = await Booking.aggregate([
            {
                $match: { user: userId }
            },
            {
                $lookup: {
                    from: 'providers',
                    localField: 'provider',
                    foreignField: '_id',
                    as: 'provider'
                }
            },
            { $unwind: '$provider' },
            {
                $lookup: {
                    from: 'services',
                    localField: 'service',
                    foreignField: '_id',
                    as: 'service'
                }
            },
            { $unwind: '$service' },
            {
                $addFields: {
                    isUpcoming: {
                        $cond: {
                            if: { $eq: ['$status', 'cancelled'] },
                            then: false,
                            else: {
                                $cond: {
                                    if: { $gt: ['$date', todayStart] },
                                    then: true,
                                    else: {
                                        $cond: {
                                            if: { $eq: ['$date', todayStart] },
                                            then: { $gte: ['$startTime', currentTimeString] },
                                            else: false
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $facet: {
                    upcoming: [
                        { $match: { isUpcoming: true } },
                        { $sort: { date: 1, startTime: 1 } },
                        {
                            $project: {
                                isUpcoming: 0,
                                "provider.password": 0,
                                "provider.__v": 0,
                                "service.__v": 0,
                                "service.schedule": 0
                            }
                        }
                    ],
                    past: [
                        { $match: { isUpcoming: false } },
                        { $sort: { date: -1, startTime: -1 } },
                        {
                            $project: {
                                isUpcoming: 0,
                                "provider.password": 0,
                                "provider.__v": 0,
                                "service.__v": 0,
                                "service.schedule": 0
                            }
                        }
                    ]
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                upcoming: appointments[0].upcoming,
                past: appointments[0].past
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get provider's bookings
exports.getProviderBookings = async (req, res, next) => {
    try {
        const providerId = req.user._id;
        const { status, serviceId, startDate, endDate } = req.query;

        let query = { provider: providerId };

        // Filter by status
        if (status) {
            query.status = status;
        }

        // Filter by service
        if (serviceId) {
            query.service = serviceId;
        }

        // Filter by date range
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const bookings = await Booking.find(query)
            .populate('user', 'name email phoneNumber')
            .populate('service', 'name duration price')
            .sort({ date: -1, startTime: -1 });

        res.status(200).json({
            status: 'success',
            results: bookings.length,
            data: {
                bookings
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get provider statistics
exports.getProviderStats = async (req, res, next) => {
    try {
        const providerId = req.user._id;

        const stats = await Booking.aggregate([
            {
                $match: { provider: providerId }
            },
            {
                $facet: {
                    statusCounts: [
                        {
                            $group: {
                                _id: '$status',
                                count: { $sum: 1 }
                            }
                        }
                    ],
                    serviceStats: [
                        {
                            $group: {
                                _id: '$service',
                                count: { $sum: 1 }
                            }
                        },
                        {
                            $lookup: {
                                from: 'services',
                                localField: '_id',
                                foreignField: '_id',
                                as: 'service'
                            }
                        },
                        { $unwind: '$service' },
                        {
                            $project: {
                                serviceName: '$service.name',
                                count: 1
                            }
                        },
                        { $sort: { count: -1 } },
                        { $limit: 5 }
                    ],
                    busiestTimes: [
                        {
                            $group: {
                                _id: '$startTime',
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { count: -1 } },
                        { $limit: 5 }
                    ]
                }
            }
        ]);

        const statusData = stats[0].statusCounts.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});

        const totalAppointments = Object.values(statusData).reduce((a, b) => a + b, 0);

        res.status(200).json({
            status: 'success',
            data: {
                totalAppointments,
                completed: statusData.completed || 0,
                cancelled: statusData.cancelled || 0,
                booked: statusData.booked || 0,
                topServices: stats[0].serviceStats,
                busiestTimes: stats[0].busiestTimes
            }
        });

    } catch (error) {
        next(error);
    }
};

// Update booking status (for providers)
exports.updateBookingStatus = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;
        const providerId = req.user._id;

        if (!['booked', 'completed', 'cancelled'].includes(status)) {
            return next(new AppError('Invalid status', 400));
        }

        const booking = await Booking.findOne({ _id: bookingId, provider: providerId });

        if (!booking) {
            return next(new AppError('Booking not found or you do not have permission', 404));
        }

        booking.status = status;
        await booking.save();

        res.status(200).json({
            status: 'success',
            data: {
                booking
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = exports;
