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

        const providerId = req.user._id;

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

        let images = [];
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => file.path);
        }
        const newService = new Service({
            name,
            description,
            duration,
            price,
            provider: providerId,
            images
        });

        await newService.save({ session });

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

        if (blockedDates && blockedDates.length > 0) {

            const blockDocs = blockedDates.map(dateString => ({
                provider: providerId,
                date: new Date(dateString),
                isFullDay: true,
                reason: 'Service Initialization Block'
            }));

            await ProviderBlock.insertMany(blockDocs, { session });
        }

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
                select: 'name email profileImage schedule'
            });


        const servicesWithAvailability = await Promise.all(services.map(async (service) => {
            const blockedDates = await ProviderBlock.find({
                provider: service.provider._id,
                date: { $gte: new Date() }
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

exports.updateService = async (req, res, next) => {
    try {
        const { serviceId } = req.params;
        const providerId = req.user._id;

        const service = await Service.findOne({ _id: serviceId, provider: providerId });

        if (!service) {
            return next(new AppError('Service not found or you do not have permission to edit it', 404));
        }

        const allowedUpdates = ['name', 'description', 'duration', 'price'];
        allowedUpdates.forEach(update => {
            if (req.body[update] !== undefined) {
                service[update] = req.body[update];
            }
        });

        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => file.path);
            service.images = [...service.images, ...newImages];
        }
        if (req.body.removeImages) {
            let removeList = req.body.removeImages;
            if (typeof removeList === 'string') removeList = [removeList];

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
