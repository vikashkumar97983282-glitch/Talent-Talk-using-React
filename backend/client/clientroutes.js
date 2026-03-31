const express = require('express');
const router = express.Router();

router.get("/client",(req,res)=>{
    res.send("welcome to the client page");
})


module.exports = router;