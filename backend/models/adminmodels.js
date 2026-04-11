const mongoose = require('mongoose');


const adminModel = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: String,
    password: String,
    age: Number,
})



module.exports = mongoose.model('admin',adminModel);