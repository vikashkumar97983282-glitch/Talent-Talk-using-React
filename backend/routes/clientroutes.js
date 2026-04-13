const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const ClientModel = require('../models/clientmodels')
const JobModel = require('../models/jobsmodel');
const jwt = require('jsonwebtoken');
const isLogin = require('../utils/registerCookies');


const upload = require('../middleware/fileupload')


// home routes
router.get('/', (req,res)=>{
    console.log('client route');
    res.send('this is client routes')
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
    let {email, password} = req.body;
    const user = await ClientModel.findOne({email});

    if(!user) return res.status(409).send("user doesn't exists!");

    try{
        bcrypt.compare(password, user.password, function(err,result){
            if(!result){
                return res.status(401).send("invalid credentials!");
            }
            let token = jwt.sign({email:email}, process.env.JWT_KEY);
            res.cookie("token", token);
            res.status(200).send("login sucessfully!");
        })

    }
    catch(err){
        console.log(err);
        res.send(err)
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
    res.clearCookie("token");
    res.send("client logout sucessfully !")
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
router.post("/upload", isLogin, upload.single("image"), async (req, res) => {
    try {
      const { name, password, age } = req.body;

      let updateData = {
        name,
        age
      };

      // update image
      if (req.file) {
        updateData.image = req.file.filename;
      }

      // update password
      if (password && password.trim() !== "") {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        updateData.password = hash;
      }

      const client = await ClientModel.findOneAndUpdate(
        { email: req.user.email },
        updateData,
        {
          new: true,
          runValidators: true
        }
      );

      if (!client) {
        return res.status(404).send("User not found");
      }

      res.send({
        message: "Updated successfully",
        client
      });

    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
);







module.exports = router;