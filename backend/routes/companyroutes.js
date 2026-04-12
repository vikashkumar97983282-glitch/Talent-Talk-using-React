const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const CompanyModel = require('../models/companymodels');
const JobModel = require('../models/jobsmodel');
const jwt = require('jsonwebtoken');
const isLogin = require('../utils/registerCookies');






// home router
router.get('/', (req,res)=>{
    console.log("this is company")
    res.send("this is company routes");
});

// register router
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

// login router
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

// get postjobs
router.get('/postjob', isLogin, async (req,res)=>{
    const company = await CompanyModel.findOne({email:req.user.email}).populate('posts');
    res.send(company.posts);
});

// post jobs
router.post('/postjob', isLogin, async (req,res)=>{
    let {title, project, payment, time, description} = req.body;

    const company = await CompanyModel.findOne({email:req.user.email});

    try{
        let job = await JobModel.create({
            title,
            project,
            payment,
            time,
            description,
            companyid: company._id,
        })
    
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