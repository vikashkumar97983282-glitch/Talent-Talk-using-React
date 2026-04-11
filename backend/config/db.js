const mongoose = require('mongoose');


mongoose.connect(process.env.Mongodb_url)
.then(()=>{
    console.log("connected to the database");
})
.catch((err)=>{
    console.log('error connecting to the database',err);
})


exports.mongoose = mongoose;