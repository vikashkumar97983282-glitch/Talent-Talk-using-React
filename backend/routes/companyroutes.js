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
    
    try{
        let {email,password} = req.body;
        const company = await CompanyModel.findOne({email});

        if(!company) return res.status(404).json({
            message: "company doesn't exists!",
            success: false,
        });

        let result = await bcrypt.compare(password, company.password)
            if(!result){

                return res.status(401).json({
                    message: "something went wrong!",
                    success: false,
                })
            }

        let token = jwt.sign({email:email}, process.env.JWT_KEY);
        res.cookie("token", token)
        res.status(200).json({
            message: "login sucessfully!",
            success: true,
        })
        
    } 
    catch(err){
        console.log(err);
        res.status(404).json({
            message: "invalid users",
            success: true,
        });
    }
});


// update company side
router.post('/update', isLogin, async (req,res)=>{
    try{
        let {name,password,} = req.body;

        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(password, salt, async function(err,hash){

                let company = await CompanyModel.findOneAndUpdate(
                    {email:req.user.email},

                    {
                        name:name,
                        password:hash
                    },

                    {returnDocument: "after" , runValidators: true}

                );
                console.log(hash)
                res.send(company)
            })
        })


    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})





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
});

// logout company
router.post('/logout', (req,res)=>{
    try{
        res.clearCookie("token", {
        httpOnly: true,
        secure: false,     
        sameSite: "lax"
        });

        res.json({
            message: "user logout sucessfully!",
            success: true,
        })
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})




module.exports = router;