const express = require('express');
const jwt = require('jsonwebtoken');


function isLogin(req,res,next){
    try{
        let token = req.cookies.token;
        if(!token){
            return res.status(401).send("please login your account!")
        }
        else {
            const data = jwt.verify(token, process.env.JWT_KEY);
            req.user = data;
        }
        next();
    }
    catch(err){
        console.log(err)
        res.send("user not login")
    }
}

module.exports = isLogin;