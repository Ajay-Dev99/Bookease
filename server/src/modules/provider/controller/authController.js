const Provider = require('../model/providerModel');
const AppError = require('../../../utils/AppError');
const { hashPassword, comparePassword } = require('../../../utils/passwordUtils');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '90d'
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password, about, address, phoneNumber } = req.body;

        let profileImage;
        if (req.file) {
            profileImage = req.file.path;
        }

        const existingProvider = await Provider.findOne({ email });
        if (existingProvider) {
            return next(new AppError('Provider already exists with this email', 400));
        }

        const hashedPassword = await hashPassword(password);

        const newProvider = await Provider.create({
            name,
            email,
            password: hashedPassword,
            about,
            address,
            phoneNumber,
            profileImage
        });

        createSendToken(newProvider, 201, res);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('Please provide email and password', 400));
        }
        const provider = await Provider.findOne({ email });

        if (!provider || !(await comparePassword(password, provider.password))) {
            return next(new AppError('Incorrect email or password', 401));
        }

        createSendToken(provider, 200, res);
    } catch (error) {
        next(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const providerId = req.user._id;

        const allowedUpdates = ['name', 'about', 'address', 'phoneNumber'];
        const updates = {};

        allowedUpdates.forEach(field => {
            if (req.body[field]) updates[field] = req.body[field];
        });

        if (req.file) {
            updates.profileImage = req.file.path;
        }

        const updatedProvider = await Provider.findByIdAndUpdate(providerId, updates, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                provider: updatedProvider
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get Provider Reports - Simple Statistics
exports.getProviderReports = async (req, res, next) => {
    try {
        const providerId = req.user._id;
        const Booking = require('../../bookings/model/bookingModel');

        // Get all bookings for this provider
        const allBookings = await Booking.find({ provider: providerId });

        // Calculate statistics
        const totalAppointments = allBookings.length;
        const completedAppointments = allBookings.filter(b => b.status === 'completed').length;
        const cancelledAppointments = allBookings.filter(b => b.status === 'cancelled').length;
        const bookedAppointments = allBookings.filter(b => b.status === 'booked').length;

        // Find busiest times of day
        const timeSlots = {};
        allBookings.forEach(booking => {
            const time = booking.startTime;
            if (time) {
                timeSlots[time] = (timeSlots[time] || 0) + 1;
            }
        });

        // Sort times by frequency and get top 5
        const busiestTimes = Object.entries(timeSlots)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([time, count]) => ({
                time,
                appointmentCount: count
            }));

        // Calculate completion rate
        const completionRate = totalAppointments > 0
            ? Math.round((completedAppointments / totalAppointments) * 100)
            : 0;

        // Calculate cancellation rate
        const cancellationRate = totalAppointments > 0
            ? Math.round((cancelledAppointments / totalAppointments) * 100)
            : 0;

        res.status(200).json({
            status: 'success',
            data: {
                summary: {
                    totalAppointments,
                    completedAppointments,
                    cancelledAppointments,
                    bookedAppointments,
                    completionRate: `${completionRate}%`,
                    cancellationRate: `${cancellationRate}%`
                },
                busiestTimes
            }
        });
    } catch (error) {
        next(error);
    }
};

