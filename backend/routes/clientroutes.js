const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const ClientModel = require('../models/clientmodels')
const JobModel = require('../models/jobsmodel');
const jwt = require('jsonwebtoken');
const isLogin = require('../utils/registerCookies');


const upload = require('../middleware/fileupload')


// home routes
router.get('/', async (req,res)=>{
    let user = await ClientModel.find();

    console.log('client route');
    res.send(user)
})


// register routes
router.post('/register', async (req,res)=>{
    let {name,email,password,age} = req.body;
    const client = await ClientModel.findOne({email});

    if(client) return res.status(409).send("user already exists!");

    try{
        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(password, salt, async function(err,hash){
                let user = await ClientModel.create({
                    name,
                    email,
                    password:hash,
                    age
                })
            })
            res.status(201).send("user create")
        })
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
});

// login routes 
router.post('/login', async (req,res)=>{ 

    try{
        let {email, password} = req.body;
        const user = await ClientModel.findOne({email});

        if(!user) return res.status(409).json({
            message: "user doesn't exists!",
            success : false,
        });


        let result = await bcrypt.compare(password, user.password)
            if(!result){
                return res.status(401).json({
                    message: "invalid credentials!",
                    success : false,
                });
            }
            let token = jwt.sign({email:email}, process.env.JWT_KEY);
            res.cookie("token", token, {
                httpOnly:true,
                secure:false,
                sameSite: "lax"
            });
            res.status(200).send({
                message: "login sucessfully",
                success: true,
            });


    }
    catch(err){
        console.log("login failed", err);
        res.json({
            message:"invalid users",
            success: true,
        })
    }
});

// update client
router.post('/update', isLogin, async (req,res)=>{
    try{
        let {name, password, age} = req.body;
        
        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(password, salt, async function(err,hash){
                const client = await ClientModel.findOneAndUpdate(
                    {email:req.user.email},
                    {
                        name,
                        password:hash,
                        age
                    },
                    {returnDocument: true, runValidators: true}
                )
            })
            res.send("user update sucessfully!")
        })
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
});


// client logout
router.post('/logout', isLogin, (req,res)=>{
    res.clearCookie("token",{
        httpOnly: true,
        secure: false,     
        sameSite: "lax"
        });
        
    res.json({
        message: "client logout sucessfully !",
        success: true,
    })
});


// apply job
router.post('/job', isLogin, async (req,res)=>{
    try{
        let client = await ClientModel.findOne({email: req.user.email});
        
        let job = JobModel.create({
            
        })

    }
    catch(err){
        console.log(err);
        res.send(err);
    }
});


// fileuploads
router.post("/upload", isLogin, upload.single("image"), async (req, res) =>{
    let client = await ClientModel.findOne({email:req.user.email});

    let data = await ClientModel.findOneAndUpdate({email:req.user.email},
        {avatar:req.file.filename},
        {returnDocument: true, runValidators: true}
    )


    console.log(client);
    res.send(data)
})







module.exports = router;