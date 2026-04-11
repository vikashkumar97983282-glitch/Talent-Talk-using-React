require('dotenv').config({quiet: true});
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');



app.use(cors());
app.use(bodyParser.json({extended:true}));
app





// database connection
require('./config/db');


// local modules import 
const adminRoutes = require('./routes/adminroutes');
const companyRoutes = require('./routes/companyroutes');
const clientRoutes = require('./routes/clientroutes')

// using local modules 
app.use(adminRoutes);
app.use(companyRoutes);
app.use(clientRoutes);



app.get("/",(req,res)=>{
    res.send("welcome to the backend");
})


const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running on address http://localhost:${PORT}`)
})