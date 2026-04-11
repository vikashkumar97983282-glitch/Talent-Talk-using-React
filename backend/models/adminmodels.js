const mongoose = require('mongoose');


const adminModel = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
})



module.exports = mongoose.model('admin',adminModel);