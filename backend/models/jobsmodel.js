const mongoose = require('mongoose');


const jobsModel = mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    project: String,
    payment: Number,
    time: Date,
    description: String,
    companyid: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "company"
        }
    ]

})

module.exports = mongoose.model("job", jobsModel);