const Booking = require('../model/bookingModel');
const Availability = require('../../provider/model/availabilityModel');
const Service = require('../../services/model/serviceModel');
const AppError = require('../../../utils/AppError');
const mongoose = require('mongoose');

exports.createBooking = async (req, res, next) => {
    // Start session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { serviceId, providerId, date, time } = req.body;
        const userId = req.user._id;

        // 1. Check if service exists
        const service = await Service.findById(serviceId);
        if (!service) {
            throw new AppError('Service not found', 404);
        }

        // 2. Validate input Date
        const bookingDate = new Date(date);
        if (isNaN(bookingDate.getTime())) {
            throw new AppError('Invalid date format', 400);
        }

        // 3. Check Availability (Is slot already marked as booked in Availability?)
        const availability = await Availability.findOne({
            provider: providerId,
            date: bookingDate,
            "slots.time": time,
            "slots.isBooked": true
        });

        if (availability) {
            throw new AppError('Slot already booked (Availability Check)', 400);
        }

        // 4. Double Check Booking Collection (Concurrency safety)
        const existingBooking = await Booking.findOne({
            provider: providerId,
            date: bookingDate,
            startTime: time,
            status: { $ne: 'cancelled' }
        });

        if (existingBooking) {
            throw new AppError('Slot already booked (Booking Check)', 400);
        }

        // 5. Create Booking
        const newBooking = (await Booking.create([{
            user: userId,
            provider: providerId,
            service: serviceId,
            date: bookingDate,
            startTime: time,
            status: 'booked'
        }], { session }))[0];

        // 6. Update Availability (Mark slot as blocked)
        await Availability.findOneAndUpdate(
            { provider: providerId, date: bookingDate },
            {
                $push: { slots: { time: time, isBooked: true } }
            },
            { upsert: true, new: true, session }
        );

        await session.commitTransaction();

        res.status(201).json({
            status: 'success',
            data: {
                booking: newBooking
            }
        });

    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
};
