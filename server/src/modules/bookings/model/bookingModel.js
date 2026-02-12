const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: String,
    status: {
        type: String,
        enum: ["booked", "completed", "cancelled"],
        default: "booked"
    }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
