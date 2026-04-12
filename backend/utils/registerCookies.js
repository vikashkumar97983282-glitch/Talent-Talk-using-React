const express = require('express');
const jwt = require('jsonwebtoken');


function isLogin(req,res,next){
    if(req.cookies.token === ""){
        return res.status(401).send("please login your account!")
    }
    else {
        let data = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        req.user = data;

    }
    next();
}

module.exports = isLogin;