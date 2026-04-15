const express = require('express');
const router = express.Router();
const JobModel = require('../models/jobsmodel')


router.get('/', async (req,res)=>{
    try{
        let job = await JobModel.find();

        if(!job) return res.json({message: "job not available", sucess: false});

        res.json(job);
    }
    catch(err){
        console.log(err)
    }
});


module.exports = router;