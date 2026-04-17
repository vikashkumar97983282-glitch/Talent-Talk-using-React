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
    let {firstname,lastname,email,password,address,phone} = req.body;

    let admin = await AdminModel.find();
    if(admin.length > 0) return res.status(401).send("Permission denied!");
    try{
        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(password, salt, async function(err,hash){
                let user = await AdminModel.create({
                    firstname,
                    lastname,
                    email,
                    password:hash,
                    address,
                    phone
                })
            })
        });
        res.status(201).json({
            message: 'admin create sucessfully',
            success: true
        });

    } catch(err){
        console.log(err);
        res.send(err)
    }
});

// login page
router.post('/login', async (req,res)=>{
    try{
        const {email,password} = req.body;
        const admin = await AdminModel.findOne({email});

        if(!admin) return res.status(401).json({
            message: "something went wrong",
            success: false,
        });

        let result = await bcrypt.compare(password, admin.password);
            if(!result){
                return res.status(401).json({
                    message: "something went wrong!",
                    success: false,
                })
            }
            let token = jwt.sign({email:email}, process.env.JWT_KEY)
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,       
                sameSite: "lax"
            });

            res.status(200).json({
                message: "login sucessfully!",
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

// profile route
router.get('/profile', isLogin, async (req,res)=>{
    try{
        let admin = await AdminModel.findOne({email:req.user.email});

        if(!admin) return res.json({message:"admin not found", success:false});
        res.status(200).json(admin);
    }
    catch(err){
        console.log(err)
        res.json({
            message:"please login your account",
            success: false
        })
    }
});

// profile update
router.post('/profileupdate', isLogin, async (req, res)=>{
    try{
            let {name, password, age} = req.body;
            
            bcrypt.genSalt(10, function(err,salt){
                bcrypt.hash(password, salt, async function(err,hash){
                    const client = await AdminModel.findOneAndUpdate(
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
})


// logout route
router.post('/logout', isLogin, (req,res)=>{
    res.clearCookie("token",{
        httpOnly: true,
        secure: false,      
        sameSite: "lax"
    });
    res.status(200).json({
        message: "logout successfully ",
        success: true,
    })
})





module.exports = router;