const mongoose = require('mongoose');

// firstname,lastname,email,password,address,phone
const adminModel = mongoose.Schema({
    firstname: {
            type: String,
            trim: true
        },
    lastname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Phone number must be 10 digits"]
    },
    avatar: String,
    role: {
        type: String,
        enum: ["Admin"],
        default: "Admin"
    }
},{ timestamps: true })



module.exports = mongoose.model('admin',adminModel);