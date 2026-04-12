const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const CompanyModel = require('../models/companymodels');
const JobModel = require('../models/jobsmodel');
const jwt = require('jsonwebtoken');
const isLogin = require('../utils/registerCookies');







router.get('/', (req,res)=>{
    console.log("this is company")
    res.send("this is company routes");
});


router.post("/register", async (req,res)=>{
    let {name,email,password,age} = req.body;
    const company = await CompanyModel.findOne({email});

    if(company) return res.status(409).send("user already exists!");

    try{   
        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(password, salt, async function(err,hash){
                let user = await CompanyModel.create({
                    name,
                    email,
                    password:hash,
                    age
                })
            })
        })
        res.send("company create sucessfully!")

    } catch(err){
        console.log(err);
        res.send(err);
    }
});


router.post('/login', async (req,res)=>{
    let {email,password} = req.body;
    const company = await CompanyModel.findOne({email})

    if(!company) return res.status(404).send("company doesn't exists!");

    try{
        bcrypt.compare(password, company.password, function(err,result){
            if(!result){

                return res.status(401).send("something went wrong!")
            }

            let token = jwt.sign({email:email}, process.env.JWT_KEY);
            res.cookie("token", token)

            res.status(200).send("login sucessfully!")
        })
    } 
    catch(err){
        console.log(err);
        res.status(404).send(err);
    }
});

// get post jobs
router.get('/postjob', isLogin, async (req,res)=>{
    const job = await JobModel.find();
    res.send(job);
});

// post jobs
router.post('/postjob', async (req,res)=>{
    let {title, project, payment, time, description} = req.body;

    const company = await CompanyModel.find();

    try{
        let job = await JobModel.create({
            title,
            project,
            payment,
            time,
            description,
            company: company._id,
        })
        console.log(job)
        company.posts.push(job._id);
        await company.save();
        res.send("sucessfully")

    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})




module.exports = router;