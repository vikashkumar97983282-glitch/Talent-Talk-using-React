const mongoose = require('mongoose');


const clientModel = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: String,
    password: String,
    age: Number,
    job:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "job"
        }
    ]
})


module.exports = mongoose.model("client", clientModel);