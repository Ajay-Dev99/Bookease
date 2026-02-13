const User = require('../model/userModel');
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

    // Remove password from output
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
        const { fullName, email, password, phoneNumber } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return next(new AppError('User already exists with this email', 400));
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber
        });

        createSendToken(newUser, 201, res);
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

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await comparePassword(password, user.password))) {
            return next(new AppError('Incorrect email or password', 401));
        }

        createSendToken(user, 200, res);
    } catch (error) {
        next(error);
    }
};

// exports.protect removed - moved to src/middleware/authMiddleware.js
