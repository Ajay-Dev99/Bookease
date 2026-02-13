const mongoose = require("mongoose");

const customAvailabilitySchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    // Override the default schedule for this specific date
    startTime: {
        type: String, // Format: "HH:MM" (e.g., "08:00")
        required: true
    },
    endTime: {
        type: String, // Format: "HH:MM" (e.g., "20:00")
        required: true
    },
    reason: {
        type: String,
        default: "Special hours"
    }
}, { timestamps: true });

// Index for faster queries
customAvailabilitySchema.index({ service: 1, date: 1 });

module.exports = mongoose.model("CustomAvailability", customAvailabilitySchema);
