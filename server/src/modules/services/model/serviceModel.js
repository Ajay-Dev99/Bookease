const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    duration: {
        type: Number,
        required: true
    },
    price: Number,
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    // Schedule - Weekly availability for this service
    schedule: {
        monday: {
            isActive: { type: Boolean, default: true },
            startTime: { type: String, default: '09:00' },
            endTime: { type: String, default: '17:00' }
        },
        tuesday: {
            isActive: { type: Boolean, default: true },
            startTime: { type: String, default: '09:00' },
            endTime: { type: String, default: '17:00' }
        },
        wednesday: {
            isActive: { type: Boolean, default: true },
            startTime: { type: String, default: '09:00' },
            endTime: { type: String, default: '17:00' }
        },
        thursday: {
            isActive: { type: Boolean, default: true },
            startTime: { type: String, default: '09:00' },
            endTime: { type: String, default: '17:00' }
        },
        friday: {
            isActive: { type: Boolean, default: true },
            startTime: { type: String, default: '09:00' },
            endTime: { type: String, default: '17:00' }
        },
        saturday: {
            isActive: { type: Boolean, default: false },
            startTime: { type: String, default: '09:00' },
            endTime: { type: String, default: '17:00' }
        },
        sunday: {
            isActive: { type: Boolean, default: false },
            startTime: { type: String, default: '09:00' },
            endTime: { type: String, default: '17:00' }
        }
    },
    // Slot configuration
    slotDuration: {
        type: Number, // in minutes
        default: 60
    },
    maxBookingsPerSlot: {
        type: Number,
        default: 1 // How many people can book the same slot
    },
    // Service status
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);
