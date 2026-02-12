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
    }
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);
