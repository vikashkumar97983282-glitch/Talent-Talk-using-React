const express = require('express');
const router = express.Router();

router.get("/company",(req,res)=>{
    res.send("welcome to the company page");
})


module.exports = router;