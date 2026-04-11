const express = require('express');
const router = express.Router();

router.get('/company', (req,res)=>{
    console.log("this is company")
    res.send("this is company routes");
})




module.exports = router;