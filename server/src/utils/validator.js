const AppError = require('./AppError');
const sanitizeHtml = require('sanitize-html');

const validateRequiredFields = (data, requiredFields) => {
    const missingFields = [];

    requiredFields.forEach(field => {
        if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
            missingFields.push(field);
        }
    });

    if (missingFields.length > 0) {
        throw new AppError(
            `Missing required fields: ${missingFields.join(', ')}`,
            400,
            'MISSING_FIELDS'
        );
    }

    return true;
};


const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new AppError('Invalid email format', 400, 'INVALID_EMAIL');
    }
    return true;
};


const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        throw new AppError('Invalid phone number. Must be 10 digits.', 400, 'INVALID_PHONE');
    }
    return true;
};


const validatePassword = (password) => {
    if (password.length < 8) {
        throw new AppError('Password must be at least 8 characters long', 400, 'WEAK_PASSWORD');
    }
    // Add more password rules as needed
    return true;
};


const validateObjectId = (id, fieldName = 'ID') => {
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(`Invalid ${fieldName}`, 400, 'INVALID_ID');
    }
    return true;
};


const sanitizeInput = (input) => {
    return sanitizeHtml(input, {
        allowedTags: [],
        allowedAttributes: {}
    });
};

const validatePagination = (page, limit) => {
    const parsedPage = parseInt(page) || 1;
    const parsedLimit = parseInt(limit) || 10;

    if (parsedPage < 1) {
        throw new AppError('Page number must be greater than 0', 400, 'INVALID_PAGE');
    }

    if (parsedLimit < 1 || parsedLimit > 100) {
        throw new AppError('Limit must be between 1 and 100', 400, 'INVALID_LIMIT');
    }

    return { page: parsedPage, limit: parsedLimit };
};

module.exports = {
    validateRequiredFields,
    validateEmail,
    validatePhone,
    validatePassword,
    validateObjectId,
    sanitizeInput,
    validatePagination
};

