const express = require('express');
const router = express.Router();


router.get('/admin', (req,res)=>{
    console.log('this is admin')
    res.send('this is admin routes');
})





module.exports = router;