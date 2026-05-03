const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const ClientModel = require('../models/clientmodels')
const JobModel = require('../models/jobsmodel');
const CompanyModel = require('../models/companymodels');
const MessageModel = require('../models/messagemodel');
const PaymentModel = require('../models/paymentmodel');
const jwt = require('jsonwebtoken');
const isLogin = require('../utils/registerCookies');
const { TOKEN_COOKIE_BY_ROLE } = require('../utils/registerCookies');
const mongoose = require('mongoose');
const sendPasswordResetEmail = require('../utils/passwordResetEmail');


const upload = require('../middleware/fileupload')


// profile routes
router.get('/profile', isLogin('client'), async (req,res)=>{
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
            let token = jwt.sign({email:email, role: "client"}, process.env.JWT_KEY);
            res.cookie(TOKEN_COOKIE_BY_ROLE.client, token, {
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

router.post('/forgot-password/send-code', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: 'email is required',
                success: false,
            });
        }

        const client = await ClientModel.findOne({ email });
        if (!client) {
            return res.status(200).json({
                message: 'If this email exists, a verification code has been sent.',
                success: true,
            });
        }

        const now = Date.now();
        const lastRequestedAt = client.passwordResetRequestedAt
            ? new Date(client.passwordResetRequestedAt).getTime()
            : 0;

        if (lastRequestedAt && now - lastRequestedAt < 60 * 1000) {
            return res.status(429).json({
                message: 'Please wait 1 minute before requesting another code.',
                success: false,
            });
        }

        const code = String(Math.floor(100000 + Math.random() * 900000));
        const codeHash = await bcrypt.hash(code, 10);

        client.passwordResetCode = codeHash;
        client.passwordResetCodeExpires = new Date(now + 10 * 60 * 1000);
        client.passwordResetRequestedAt = new Date(now);
        await client.save();

        const fullName = `${client.firstname || ''} ${client.lastname || ''}`.trim();
        const emailResult = await sendPasswordResetEmail({
            to: client.email,
            name: fullName,
            code,
            accountType: 'client',
        });

        return res.status(200).json({
            message: 'Verification code sent to your email.',
            success: true,
            devCode: emailResult.delivered ? undefined : code,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});

router.post('/forgot-password/reset', async (req, res) => {
    try {
        const { email, code, newPassword, confirmPassword } = req.body;

        if (!email || !code || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: 'email, code, newPassword and confirmPassword are required',
                success: false,
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: 'new password and confirm password must match',
                success: false,
            });
        }

        const client = await ClientModel.findOne({ email }).select(
            '+passwordResetCode +passwordResetCodeExpires +passwordResetRequestedAt'
        );

        if (!client || !client.passwordResetCode || !client.passwordResetCodeExpires) {
            return res.status(400).json({
                message: 'invalid or expired verification code',
                success: false,
            });
        }

        if (new Date(client.passwordResetCodeExpires).getTime() < Date.now()) {
            return res.status(400).json({
                message: 'verification code has expired',
                success: false,
            });
        }

        const isCodeValid = await bcrypt.compare(String(code), client.passwordResetCode);
        if (!isCodeValid) {
            return res.status(400).json({
                message: 'invalid or expired verification code',
                success: false,
            });
        }

        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(newPassword, salt, async function(err,hash){
                client.password = hash;
                client.passwordResetCode = undefined;
                client.passwordResetCodeExpires = undefined;
                client.passwordResetRequestedAt = undefined;
                await client.save();

                return res.status(200).json({
                    message: 'password reset successfully',
                    success: true,
                });
            })
        })

        // const salt = await bcrypt.genSalt(10);
        // const passwordHash = await bcrypt.hash(newPassword, salt);

        // client.password = passwordHash;
        // client.passwordResetCode = undefined;
        // client.passwordResetCodeExpires = undefined;
        // client.passwordResetRequestedAt = undefined;
        // await client.save();

        // return res.status(200).json({
        //     message: 'password reset successfully',
        //     success: true,
        // });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});


router.post('/update', isLogin('client'), async (req, res) => {
  try {
    let { fullname, newpassword, phone } = req.body;

    const parts = fullname?.trim().split(" ") || [];
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";

    let updateData = {
      firstname: firstName,
      lastname: lastName,
      phone
    };

    if (newpassword && newpassword.length > 0) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newpassword, salt);

      updateData.password = hash;
    }
    
    const client = await ClientModel.findOneAndUpdate(
      { email: req.user.email },
      updateData,
      { returnDocument: 'after', runValidators: true }
    );

    res.json({message: "user update successfully", success: true});

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// client logout
router.post('/logout', isLogin('client'), (req,res)=>{
    res.clearCookie(TOKEN_COOKIE_BY_ROLE.client,{
        httpOnly: true,
        secure: false,     
        sameSite: "lax"
        });
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
router.post('/applyjob', isLogin('client'), async (req,res)=>{
    try{
        let {job_id} = req.body;
        console.log(job_id)
        let client = await ClientModel.findOne({email: req.user.email});

        if(!client) return res.json({message:"something went wroong", success: false});
        let valid = await JobModel.findOne({_id: job_id,clientid: client._id});
        if(valid) return res.json({message:"job already added", success: true});

        let job = await JobModel.findOneAndUpdate(
            { _id: job_id },
            { clientid: client._id },
            { returnDocument: 'after', runValidators: true }
        )
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

// get apply jobs
router.get('/applyjob', isLogin('client'), async (req,res)=>{
    try{
        let jobs = await ClientModel.findOne({email:req.user.email}).populate('job');
        res.json(jobs.job)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
});

router.post('/changejobstatus', isLogin('client'), async (req, res) => {
    try{
        let { job_id, status } = req.body;
        const allowedStatuses = ["initial", "progress", "complete"];

        if(!job_id || !status) {
            return res.status(400).json({
                message: "job_id and status are required",
                success: false
            });
        }

        if(!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "invalid status value",
                success: false
            });
        }

        let client = await ClientModel.findOne({email: req.user.email});

        if(!client) {
            return res.status(404).json({
                message: "client not found",
                success: false
            });
        }

        let job = await JobModel.findOneAndUpdate(
            {_id: job_id, clientid: client._id},
            {status},
            { returnDocument: 'after', runValidators: true }
        );

        if(!job) {
            return res.status(404).json({
                message: "job not found for this client",
                success: false
            });
        }

        if (status === "complete") {
            const companyId = Array.isArray(job.companyid) ? job.companyid[0] : job.companyid;
            const paymentAmount = Number(job.payment || 0);

            if (companyId) {
                const existingPayment = await PaymentModel.findOne({
                    clientId: client._id,
                    companyId,
                    jobId: job._id,
                    status: { $in: ["Pending", "Success"] },
                });

                if (!existingPayment) {
                    await PaymentModel.create({
                        companyId,
                        clientId: client._id,
                        jobId: job._id,
                        amount: Number.isFinite(paymentAmount) ? paymentAmount : 0,
                        currency: "INR",
                        status: "Pending",
                        description: job.title
                            ? `Payment for project: ${job.title}`
                            : "Payment for completed project",
                    });
                }
            }
        }
        if (status === "initial" || status === "progress") {
            const companyId = Array.isArray(job.companyid) ? job.companyid[0] : job.companyid;

            if (companyId) {
                await PaymentModel.deleteMany({
                    clientId: client._id,
                    companyId,
                    jobId: job._id,
                    status: "Pending",
                });
            }
        }

        res.status(200).json({
            message: "job status updated successfully",
            success: true,
            job
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "something went wrong",
            success: false
        });
    }
});


// fileuploads
router.post("/upload", isLogin('client'), upload.single("image"), async (req, res) =>{
    try {
        let client = await ClientModel.findOne({ email: req.user.email });
        if (!client) {
            return res.status(404).json({
                message: 'client not found',
                success: false,
            });
        }

        if (!req.file?.filename) {
            return res.status(400).json({
                message: 'image file is required',
                success: false,
            });
        }

        let data = await ClientModel.findOneAndUpdate(
            { email: req.user.email },
            { avatar: req.file.filename },
            { returnDocument: 'after', runValidators: true }
        );

        res.status(200).json({
            message: 'profile image uploaded successfully',
            success: true,
            client: data,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});



router.get('/alljobs', isLogin('client'), async (req, res)=>{
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







router.get('/messages', isLogin('client'), async (req, res) => {
    try {
        const client = await ClientModel.findOne({ email: req.user.email });

        if (!client) {
            return res.status(404).json({
                message: 'client not found',
                success: false,
            });
        }

        const messages = await MessageModel.find({ clientId: client._id })
            .populate('companyId', 'name email location')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'messages fetched successfully',
            success: true,
            messages,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});

router.get('/messages/recipients', isLogin('client'), async (req, res) => {
    try {
        const client = await ClientModel.findOne({ email: req.user.email });

        if (!client) {
            return res.status(404).json({
                message: 'client not found',
                success: false,
            });
        }

        const jobs = await JobModel.find({ clientid: client._id }).populate(
            'companyid',
            'name email location'
        );

        const recipientMap = new Map();

        jobs.forEach((job) => {
            const companies = Array.isArray(job.companyid) ? job.companyid : [job.companyid];
            companies.filter(Boolean).forEach((company) => {
                recipientMap.set(String(company._id), company);
            });
        });

        res.status(200).json({
            message: 'recipients fetched successfully',
            success: true,
            recipients: Array.from(recipientMap.values()),
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});

router.get('/messages/:messageId', isLogin('client'), async (req, res) => {
    try {
        const client = await ClientModel.findOne({ email: req.user.email });

        if (!client) {
            return res.status(404).json({
                message: 'client not found',
                success: false,
            });
        }

        const { messageId } = req.params;
        if (!mongoose.isValidObjectId(messageId)) {
            return res.status(400).json({
                message: 'invalid message id',
                success: false,
            });
        }

        const message = await MessageModel.findOneAndUpdate(
            { _id: messageId, clientId: client._id },
            { isReadByClient: true },
            { returnDocument: 'after' }
        ).populate('companyId', 'name email location');

        if (!message) {
            return res.status(404).json({
                message: 'message not found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'message fetched successfully',
            success: true,
            data: message,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});

router.post('/messages/send', isLogin('client'), async (req, res) => {
    try {
        const { companyId, subject, message } = req.body;

        if (!companyId || !subject || !message) {
            return res.status(400).json({
                message: 'companyId, subject and message are required',
                success: false,
            });
        }

        if (!mongoose.isValidObjectId(companyId)) {
            return res.status(400).json({
                message: 'invalid company id',
                success: false,
            });
        }

        const client = await ClientModel.findOne({ email: req.user.email });
        if (!client) {
            return res.status(404).json({
                message: 'client not found',
                success: false,
            });
        }

        const company = await CompanyModel.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: 'company not found',
                success: false,
            });
        }

        const createdMessage = await MessageModel.create({
            companyId,
            clientId: client._id,
            senderRole: 'client',
            subject: String(subject).trim(),
            message: String(message).trim(),
            isReadByCompany: false,
            isReadByClient: true,
        });

        const populatedMessage = await MessageModel.findById(createdMessage._id).populate(
            'companyId',
            'name email location'
        );

        res.status(201).json({
            message: 'message sent successfully',
            success: true,
            data: populatedMessage,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});

router.delete('/messages/:messageId', isLogin('client'), async (req, res) => {
    try {
        const client = await ClientModel.findOne({ email: req.user.email });

        if (!client) {
            return res.status(404).json({
                message: 'client not found',
                success: false,
            });
        }

        const { messageId } = req.params;
        if (!mongoose.isValidObjectId(messageId)) {
            return res.status(400).json({
                message: 'invalid message id',
                success: false,
            });
        }

        const deletedMessage = await MessageModel.findOneAndDelete({
            _id: messageId,
            clientId: client._id,
        });

        if (!deletedMessage) {
            return res.status(404).json({
                message: 'message not found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'message deleted successfully',
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});

router.get('/payments', isLogin('client'), async (req, res) => {
    try {
        const client = await ClientModel.findOne({ email: req.user.email });
        if (!client) {
            return res.status(404).json({
                message: 'client not found',
                success: false,
            });
        }

        // Backfill pending payments for completed projects that do not yet
        // have a payment entry, so the payments page always reflects project status.
        const completedJobs = await JobModel.find({
            clientid: client._id,
            status: 'complete',
        }).select('_id companyid payment title');

        for (const job of completedJobs) {
            const companyId = Array.isArray(job.companyid) ? job.companyid[0] : job.companyid;
            if (!companyId) continue;

            const existingPayment = await PaymentModel.findOne({
                clientId: client._id,
                companyId,
                jobId: job._id,
            }).select('_id');

            if (existingPayment) continue;

            const amount = Number(job.payment || 0);

            await PaymentModel.create({
                companyId,
                clientId: client._id,
                jobId: job._id,
                amount: Number.isFinite(amount) ? amount : 0,
                currency: 'INR',
                status: 'Pending',
                description: job.title
                    ? `Payment for project: ${job.title}`
                    : 'Payment for completed project',
            });
        }

        const payments = await PaymentModel.find({ clientId: client._id })
            .populate('companyId', 'name email location avatar')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            payments,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});

module.exports = router;
