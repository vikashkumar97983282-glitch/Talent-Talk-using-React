const express = require('express');
const router = express.Router();


router.get('/', (req,res)=>{
    console.log('client route');
    res.send('this is client routes')
})



module.exports = router;