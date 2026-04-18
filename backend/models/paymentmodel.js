const mongoose = require('mongoose');

const paymentModel = mongoose.Schema(
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
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'job',
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: 'INR',
        },
        status: {
            type: String,
            enum: ['Pending', 'Success', 'Failed'],
            default: 'Pending',
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
        razorpayOrderId: {
            type: String,
            trim: true,
        },
        razorpayPaymentId: {
            type: String,
            trim: true,
        },
        razorpaySignature: {
            type: String,
            trim: true,
        },
        paidAt: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.model('payment', paymentModel);
