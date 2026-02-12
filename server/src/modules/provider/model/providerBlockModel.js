const mongoose = require('mongoose');

const providerBlockSchema = new mongoose.Schema({
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isFullDay: {
        type: Boolean,
        default: false
    },
    startTime: String,
    endTime: String,
    reason: {
        type: String,
        default: 'Unavailable'
    }
}, { timestamps: true });

providerBlockSchema.index({ provider: 1, date: 1 });

module.exports = mongoose.model('ProviderBlock', providerBlockSchema);
