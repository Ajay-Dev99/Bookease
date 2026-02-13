const mongoose = require("mongoose");

const blockedDateSchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    // If these are null, the entire day is blocked
    startTime: {
        type: String, // Format: "HH:MM" (e.g., "14:00")
        default: null
    },
    endTime: {
        type: String, // Format: "HH:MM" (e.g., "16:00")
        default: null
    },
    reason: {
        type: String,
        default: "Unavailable"
    },
    // For recurring blocks (e.g., every Monday)
    isRecurring: {
        type: Boolean,
        default: false
    },
    recurringPattern: {
        type: String,
        enum: ["daily", "weekly", "monthly", null],
        default: null
    },
    recurringEndDate: {
        type: Date,
        default: null
    }
}, { timestamps: true });

// Index for faster queries
blockedDateSchema.index({ service: 1, date: 1 });

module.exports = mongoose.model("BlockedDate", blockedDateSchema);
