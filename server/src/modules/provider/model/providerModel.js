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
    profileImage: {
        type: String,
        default: 'https://res.cloudinary.com/djp9o0vcc/image/upload/v1715403067/default-profile_wxfjau.png' // You can replace with your own default
    },
    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service"
        }
    ]
})

module.exports = mongoose.model("Provider", providerSchema)
