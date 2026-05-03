const express = require('express');
const router = express.Router();
const AdminModel = require('../models/adminmodels')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isLogin = require('../utils/registerCookies');
const { TOKEN_COOKIE_BY_ROLE } = require('../utils/registerCookies');
const upload = require('../middleware/fileupload')


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
            let token = jwt.sign({email:email, role: "admin"}, process.env.JWT_KEY)
            res.cookie(TOKEN_COOKIE_BY_ROLE.admin, token, {
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
router.get('/profile', isLogin('admin'), async (req,res)=>{
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
router.post('/profileupdate', isLogin('admin'), async (req, res)=>{
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
                        { returnDocument: 'after', runValidators: true }
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

router.post('/upload', isLogin('admin'), upload.single('image'), async (req, res) => {
    try {
        const admin = await AdminModel.findOne({ email: req.user.email });

        if (!admin) {
            return res.status(404).json({
                message: 'admin not found',
                success: false,
            });
        }

        if (!req.file?.filename) {
            return res.status(400).json({
                message: 'image file is required',
                success: false,
            });
        }

        const data = await AdminModel.findOneAndUpdate(
            { email: req.user.email },
            { avatar: req.file.filename },
            { returnDocument: 'after', runValidators: true }
        ).select('-password');

        res.status(200).json({
            message: 'profile image uploaded successfully',
            success: true,
            admin: data,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});


// logout route
router.post('/logout', isLogin('admin'), (req,res)=>{
    res.clearCookie(TOKEN_COOKIE_BY_ROLE.admin,{
        httpOnly: true,
        secure: false,      
        sameSite: "lax"
    });
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
