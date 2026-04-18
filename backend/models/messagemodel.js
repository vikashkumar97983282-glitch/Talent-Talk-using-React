const mongoose = require('mongoose');

const messageModel = mongoose.Schema(
    {
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'company',
            required: true,
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'client',
            required: true,
        },
        senderRole: {
            type: String,
            enum: ['company', 'client'],
            required: true,
        },
        subject: {
            type: String,
            trim: true,
            required: true,
        },
        message: {
            type: String,
            trim: true,
            required: true,
        },
        isReadByCompany: {
            type: Boolean,
            default: false,
        },
        isReadByClient: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('message', messageModel);
