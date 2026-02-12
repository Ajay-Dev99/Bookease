const mongoose = require("mongoose")

const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service"
        }
    ],
    schedule: {
        monday: { isActive: { type: Boolean, default: true }, startTime: { type: String, default: '10:00' }, endTime: { type: String, default: '16:00' } },
        tuesday: { isActive: { type: Boolean, default: true }, startTime: { type: String, default: '10:00' }, endTime: { type: String, default: '16:00' } },
        wednesday: { isActive: { type: Boolean, default: true }, startTime: { type: String, default: '10:00' }, endTime: { type: String, default: '16:00' } },
        thursday: { isActive: { type: Boolean, default: true }, startTime: { type: String, default: '10:00' }, endTime: { type: String, default: '16:00' } },
        friday: { isActive: { type: Boolean, default: true }, startTime: { type: String, default: '10:00' }, endTime: { type: String, default: '16:00' } },
        saturday: { isActive: { type: Boolean, default: false }, startTime: { type: String, default: '10:00' }, endTime: { type: String, default: '16:00' } },
        sunday: { isActive: { type: Boolean, default: false }, startTime: { type: String, default: '10:00' }, endTime: { type: String, default: '16:00' } }
    }
})

module.exports = mongoose.model("Provider", providerSchema)
