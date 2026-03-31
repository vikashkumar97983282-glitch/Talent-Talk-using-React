const express = require('express');
const router = express.Router();

router.get("/admin",(req,res)=>{
    res.send("welcome to the admin page");
})

module.exports = router;