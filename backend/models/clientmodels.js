const mongoose = require('mongoose');


const clientModel = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number
})


module.exports = mongoose.model("client", clientModel);