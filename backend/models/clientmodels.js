const mongoose = require('mongoose');

// firstname,lastname,email,password,confirmpassword,address,purpose,profession
const clientModel = mongoose.Schema({
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
    purpose: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Phone number must be 10 digits"]
    },
    profession: {
        type: String,
        trim: true
    },
    job:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "job"
        }
    ],
    avatar: String,
    passwordResetCode: {
        type: String,
        select: false
    },
    passwordResetCodeExpires: {
        type: Date,
        select: false
    },
    passwordResetRequestedAt: {
        type: Date,
        select: false
    },
    role: {
        type: String,
        enum: ["Client"],
        default: "Client"
    }
},{ timestamps: true })


module.exports = mongoose.model("client", clientModel);
