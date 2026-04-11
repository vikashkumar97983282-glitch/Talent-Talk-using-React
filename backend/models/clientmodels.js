const mongoose = require('mongoose');


const clientModel = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: String,
    password: String,
    age: Number
})


module.exports = mongoose.model("client", clientModel);