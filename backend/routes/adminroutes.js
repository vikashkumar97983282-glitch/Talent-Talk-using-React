const express = require('express');
const router = express.Router();
const AdminModel = require('../models/adminmodels')
const bcrypt = require('bcrypt');


router.get('/', (req,res)=>{
    console.log('this is admin')
    res.send('this is admin routes');
});


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


router.post('/login', async (req,res)=>{
    let {email, password} = req.body;
    const admin = await AdminModel.findOne({email});

    if(!admin) return res.status(401).send(" admin something went wrong");
    bcrypt.compare(password, admin.password, function(err,result){
        if(!result){
            return res.status(401).send("something went wrong!")
        }

        res.status(200).send("user login sucessfully!")
        
    })
})





module.exports = router;