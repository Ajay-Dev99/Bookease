const Service = require('../model/serviceModel');
const Provider = require('../../provider/model/providerModel');
const ProviderBlock = require('../../provider/model/providerBlockModel');
const AppError = require('../../../utils/AppError');


exports.createService = async (req, res, next) => {
    const session = await Service.startSession();
    session.startTransaction();

    try {
        const { name, description, duration, price, schedule, blockedDates } = req.body;
        const providerId = req.user._id;

        let images = [];
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => file.path);
        }

        const newService = await Service.create([{
            name,
            description,
            duration,
            price,
            provider: providerId,
            images: images
        }], { session });

        const providerUpdate = {
            $push: { services: newService[0]._id }
        };
        if (schedule) {
            providerUpdate.schedule = schedule;
        }

        await Provider.findByIdAndUpdate(providerId, providerUpdate, { session });

        if (blockedDates && blockedDates.length > 0) {
            const blockDocs = blockedDates.map(dateString => ({
                provider: providerId,
                date: new Date(dateString),
                isFullDay: true,
                reason: 'Service Initialization Block'
            }));

            await ProviderBlock.create(blockDocs, { session });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            status: 'success',
            data: {
                service: newService[0]
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};
