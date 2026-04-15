const mongoose = require('mongoose');


const jobsModel = mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    category: String,
    payment: Number,
    time: Date,
    description: String,
    companyid: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "company"
        }
    ],
    clientid:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "client"
        }
    ]

})

module.exports = mongoose.model("job", jobsModel);