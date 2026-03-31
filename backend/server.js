const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json({extended:true}));


app.get("/",(req,res)=>{
    res.send("welcome to the backend");
})


const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`server is running on address http://localhost:${PORT}`);
})