const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    slots: [{
        time: {
            type: String,
            required: true
        },
        isBooked: {
            type: Boolean,
            default: false
        }
    }]
}, { timestamps: true });


availabilitySchema.index({ provider: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Availability', availabilitySchema);
