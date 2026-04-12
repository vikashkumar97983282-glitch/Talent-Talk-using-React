require('dotenv').config({quiet: true});
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser');


// internal models
app.use(cors());
app.use(express())
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());


// database connection
require('./config/db');
const jobs = require('./models/jobsmodel');


// local modules import 
const adminRoutes = require('./routes/adminroutes');
const companyRoutes = require('./routes/companyroutes');
const clientRoutes = require('./routes/clientroutes')



app.get("/",(req,res)=>{
    res.send("welcome to the backend");
})



// using local modules 
app.use('/admin',adminRoutes);
app.use('/company',companyRoutes);
app.use('/client',clientRoutes);


// error handling middleware
app.use((req,res)=>{
    res.status(401).send("something went wrong!")
})




const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is running on address http://localhost:${PORT}`)
})