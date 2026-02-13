const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const User = require('../modules/user/model/userModel');

exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new AppError('You are not logged in! Please log in to get access.', 401));
        }

        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            });
        });

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return next(new AppError('The user belonging to this token no longer does exist.', 401));
        }

        req.user = currentUser;
        next();
    } catch (error) {
        return next(new AppError('Not authorized to access this route', 401));
    }
};
