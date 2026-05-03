const mongoose = require('mongoose');

const jobsModel = mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    payment: Number,
    time: Date,
    description: {
        type: String,
        trim: true
    },
    companyid: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "company"
        }
    ],
    clientid: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "client"
        }
    ],
    shortlistedClients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "client"
        }
    ],
    status: {
        type: String,
        enum: ["initial", "progress", "complete"],
        default: "initial"
    }

}, { timestamps: true });

module.exports = mongoose.model("job", jobsModel);
