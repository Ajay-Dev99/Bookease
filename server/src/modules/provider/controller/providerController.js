const Provider = require('../model/providerModel');
const Service = require('../../services/model/serviceModel');
const AppError = require('../../../utils/AppError');

// Get all providers (public)
exports.getAllProviders = async (req, res, next) => {
    try {
        const providers = await Provider.find()
            .populate({
                path: 'services',
                select: 'name price description duration category isActive'
            })
            .select('-password');

        res.status(200).json({
            status: 'success',
            results: providers.length,
            data: {
                providers
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get single provider (public)
exports.getProvider = async (req, res, next) => {
    try {
        const provider = await Provider.findById(req.params.id)
            .populate({
                path: 'services',
                select: 'name price description duration isActive images'
            })
            .select('-password');

        if (!provider) {
            return next(new AppError('No provider found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                provider
            }
        });
    } catch (error) {
        next(error);
    }
};
