require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


// local modules import 
const adminRoutes = require('./admin/adminroutes');
const clientRoutes = require('./client/clientroutes');
const companyRoutes = require('./company/companyroutes');

// using local modules 
app.use(adminRoutes);
app.use(clientRoutes);
app.use(companyRoutes);


app.use(cors());
app.use(bodyParser.json({extended:true}));


app.get("/",(req,res)=>{
    res.send("welcome to the backend");
})


const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running on address http://localhost:${PORT}`)
})