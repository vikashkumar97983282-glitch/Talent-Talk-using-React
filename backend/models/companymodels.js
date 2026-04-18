const mongoose = require('mongoose');


const companyModel = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: String,
    password: String,
    phone: String,
    location: String,
    age: Number,
    posts: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "job" 
        },
    ],
    role: {
        type: String,
        default: "Company"
    }
}, { timestamps: true })




module.exports = mongoose.model("company", companyModel);
