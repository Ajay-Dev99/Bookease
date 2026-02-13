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


