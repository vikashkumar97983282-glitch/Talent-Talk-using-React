const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const ClientModel = require('../models/clientmodels')
const JobModel = require('../models/jobsmodel');
const jwt = require('jsonwebtoken');
const isLogin = require('../utils/registerCookies');


const upload = require('../middleware/fileupload')


// profile routes
router.get('/profile', isLogin, async (req,res)=>{
    try{
        let user = await ClientModel.findOne({email:req.user.email});

        if(!user) return res.json({
            message: "user not found",
            success: false
        })
        res.status(200).json(user)
    }
    catch(err){
        console.log(err)
        res.status(401).json({
            message: "something went wrong",
            success: true
        })
    }
})


// register routes
router.post('/register', async (req,res)=>{
    try{
         let {firstname,lastname,email,password,confirmpassword,address,purpose,phone,profession} = req.body;
        const client = await ClientModel.findOne({email});

        if(client) return res.json({message: "user already exists!", success: false});

        if(password !== confirmpassword) return res.json({message: "password not matched", success: false})

        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(password, salt, async function(err,hash){
                let user = await ClientModel.create({
                    firstname,
                    lastname,
                    email,
                    password:hash,
                    address,
                    purpose,
                    phone,
                    profession
                })
            })
            res.status(201).json({message: "user create successfully!", success: true})
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
                return res.json({
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
            res.status(200).json({
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


router.post('/update', isLogin, async (req, res) => {
  try {
    let { fullname, newpassword, phone } = req.body;

    // 🔹 Split name safely
    const parts = fullname?.trim().split(" ") || [];
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";

    // 🔹 Prepare update object
    let updateData = {
      firstname: firstName,
      lastname: lastName,
      phone
    };

    // 🔐 Only hash if password provided
    if (newpassword && newpassword.length > 0) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newpassword, salt);

      updateData.password = hash;
    }

    // 🔹 Update user
    const client = await ClientModel.findOneAndUpdate(
      { email: req.user.email },
      updateData,
      {returnDocument: true, runValidators: true}
    );

    res.json({message: "user update successfully", success: true});

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
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
        message: "user logout sucessfully !",
        success: true,
    })
});


// apply job
router.post('/applyjob', isLogin, async (req,res)=>{
    try{
        let {job_id} = req.body;
        let client = await ClientModel.findOne({email: req.user.email});

        if(!client) return res.json({message:"something went wroong", success: false});
        let valid = await JobModel.findOne({_id: job_id,clientid: client._id});
        if(valid) return res.json({message:"job already added", success: true});

        let job = await JobModel.findOneAndUpdate({_id:job_id},{clientid:client._id},{returnDocument: true, runValidators: true})
        client.job.push(job_id);
        await client.save();

        res.json({
            message: "job applied successfully",
            sucess: true
        })

    }
    catch(err){
        console.log(err);
        res.send(err);
    };
});

router.get('/applyjob', isLogin, async (req,res)=>{
    try{
        let jobs = await ClientModel.findOne({email:req.user.email}).populate('job');
        res.json(jobs)
    }
    catch(err){
        console.log(err)
        res.send(err)
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
});



router.get('/alljobs', isLogin, async (req, res)=>{
    try{
        const job =  await JobModel.find();
        if(!job) return res.send("job not available");

        res.json(job)
    }
    catch(err){
        console.log(err);
        res.json({
            message: err,
            success: false,
        })
    }
})







module.exports = router;