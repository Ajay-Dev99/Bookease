const mongoose = require('mongoose');
const Service = require('../model/serviceModel');
const Provider = require('../../provider/model/providerModel');
const ProviderBlock = require('../../provider/model/providerBlockModel');
const AppError = require('../../../utils/AppError');

exports.createService = async (req, res, next) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        let { name, description, duration, price, schedule, blockedDates } = req.body;

        // const providerId = req.user._id;
        const providerId = "698e266f1dd46e345f083f18";

        // Parse JSON fields if coming from multipart/form-data
        if (typeof schedule === 'string') {
            try {
                schedule = JSON.parse(schedule);
            } catch (e) {
                throw new AppError('Invalid JSON format for schedule', 400);
            }
        }

        if (typeof blockedDates === 'string') {
            try {
                blockedDates = JSON.parse(blockedDates);
            } catch (e) {
                throw new AppError('Invalid JSON format for blockedDates', 400);
            }
        }

        // Handle image uploads
        let images = [];
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => file.path);
        }

        // 1️⃣ Create Service
        const newService = new Service({
            name,
            description,
            duration,
            price,
            provider: providerId,
            images
        });

        await newService.save({ session });

        // 2️⃣ Update Provider (push service + optionally update schedule)
        const providerUpdate = {
            $push: { services: newService._id }
        };

        if (schedule) {
            providerUpdate.schedule = schedule;
        }

        await Provider.findByIdAndUpdate(
            providerId,
            providerUpdate,
            { session }
        );

        // 3️⃣ Insert Blocked Dates (if provided)
        if (blockedDates && blockedDates.length > 0) {

            const blockDocs = blockedDates.map(dateString => ({
                provider: providerId,
                date: new Date(dateString),
                isFullDay: true,
                reason: 'Service Initialization Block'
            }));

            await ProviderBlock.insertMany(blockDocs, { session });
        }

        // 4️⃣ Commit Transaction
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

exports.getServices = async (req, res, next) => {
    try {
        const services = await Service.find()
            .populate({
                path: 'provider',
                select: 'name email profileImage schedule' // Get provider schedule
            });


        const servicesWithAvailability = await Promise.all(services.map(async (service) => {
            const blockedDates = await ProviderBlock.find({
                provider: service.provider._id,
                date: { $gte: new Date() } // Only future blocked dates
            }).select('date isFullDay startTime endTime reason');

            return {
                ...service.toObject(),
                provider: {
                    ...service.provider.toObject(),
                    blockedDates: blockedDates
                }
            };
        }));

        res.status(200).json({
            status: 'success',
            results: servicesWithAvailability.length,
            data: {
                services: servicesWithAvailability
            }
        });
    } catch (error) {
        next(error);
    }
};
