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
            bcrypt.hash(password, salt, function(err,hash){
                let user = AdminModel.create({
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





module.exports = router;