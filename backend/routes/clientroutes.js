const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const ClientModel = require('../models/clientmodels')


router.get('/', (req,res)=>{
    console.log('client route');
    res.send('this is client routes')
})

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
            res.send("user create")
        })
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
});


router.post('/login', async (req,res)=>{
    let {email, password} = req.body;
    const user = await ClientModel.findOne({email});

    if(!user) return res.status(409).send("user doesn't exists!");

    try{
        bcrypt.compare(password, user.password, function(err,result){
            if(!result){
                return res.status(401).send("invalid credentials!")
            }
            res.send("login sucessfully!")
        })

    }
    catch(err){
        console.log(err);
        res.send(err)
    }
})



module.exports = router;