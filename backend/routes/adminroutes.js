const express = require('express');
const router = express.Router();
const AdminModel = require('../models/adminmodels')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isLogin = require('../utils/registerCookies');


router.get('/', (req,res)=>{
    console.log('this is admin')
    res.send('this is admin routes');
});

// register page
router.post('/register', async (req,res)=>{
    let {name,email,password,age} = req.body;

    let admin = await AdminModel.find();
    if(admin.length > 0) return res.status(401).send("Permission denied!");
    try{
        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(password, salt, async function(err,hash){
                let user = await AdminModel.create({
                    name,
                    email,
                    password:hash,
                    age
                })
            })
        });
        res.status(201).send('admin create sucessfully');

    } catch(err){
        console.log(err);
        res.send(err)
    }
});

// login page
router.post('/login', async (req,res)=>{
    try{
        const {email,password} = req.body;
        console.log(email,password)
        const admin = await AdminModel.findOne({email});

        if(!admin) return res.status(401).json({
            message: " admin something went wrong",
            success: false,
        });

        let result = await bcrypt.compare(password, admin.password);
            if(!result){
                return res.status(401).json({
                    message: "something went wrong!",
                    success: false,
                })
            }
            let token = jwt.sign("token",process.env.JWT_KEY)
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,       
                sameSite: "lax"
            });

            return res.status(200).json({
                message: "user login sucessfully!",
                success: true,
            });
            
    }
    catch(err){
        res.send({
            message: "invalid user",
            sucess: false,
        })
    }
});

router.post('/logout', isLogin, (req,res)=>{
    res.clearCookie("token",{
        httpOnly: true,
        secure: false,       // true only on HTTPS
        sameSite: "lax"
    });
    res.status(200).json({
        message: "logout successfully ",
        success: true,
    })
})





module.exports = router;