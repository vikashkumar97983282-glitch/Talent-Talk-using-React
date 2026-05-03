const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const CompanyModel = require('../models/companymodels');
const JobModel = require('../models/jobsmodel');
const ClientModel = require('../models/clientmodels');
const MessageModel = require('../models/messagemodel');
const PaymentModel = require('../models/paymentmodel');
const jwt = require('jsonwebtoken');
const isLogin = require('../utils/registerCookies');
const { TOKEN_COOKIE_BY_ROLE } = require('../utils/registerCookies');
const mongoose = require('mongoose');
const upload = require('../middleware/fileupload');
const sendPasswordResetEmail = require('../utils/passwordResetEmail');

function getRazorpayClient() {
    const keyId = String(process.env.RAZORPAY_KEY_ID || '').trim();
    const keySecret = String(process.env.RAZORPAY_KEY_SECRET || '').trim();

    if (!keyId || !keySecret) return null;

    return new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
    });
}






// home router
router.get('/', (req,res)=>{
    console.log("this is company")
    res.send("this is company routes");
});

// register router
router.post("/register", async (req,res)=>{
    try{
        let {
            name,
            companyName,
            email,
            password,
            age,
            phone,
            location,
            city
        } = req.body;

        const finalName = String(name || companyName || "").trim();
        const finalEmail = String(email || "").trim().toLowerCase();
        const finalPassword = String(password || "");
        const finalLocation = String(location || city || "").trim();

        if(!finalName || !finalEmail || !finalPassword){
            return res.status(400).json({
                message: "name, email and password are required",
                success: false
            });
        }

        const company = await CompanyModel.findOne({email: finalEmail});
        if(company){
            return res.status(409).json({
                message: "user already exists!",
                success: false
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(finalPassword, salt);

        await CompanyModel.create({
            name: finalName,
            email: finalEmail,
            password: hash,
            age,
            phone,
            location: finalLocation
        });

        return res.status(201).json({
            message: "company created successfully!",
            success: true
        });
    } catch(err){
        console.log(err);
        return res.status(500).json({
            message: "something went wrong",
            success: false
        });
    }
});

// login router
router.post('/login', async (req,res)=>{
    
    try{
        let {email,password} = req.body;
        const company = await CompanyModel.findOne({email});

        if(!company) return res.status(404).json({
            message: "company doesn't exists!",
            success: false,
        });

        let result = await bcrypt.compare(password, company.password)
            if(!result){

                return res.status(401).json({
                    message: "something went wrong!",
                    success: false,
                })
            }

        let token = jwt.sign({email:email, role: "company"}, process.env.JWT_KEY);
        res.cookie(TOKEN_COOKIE_BY_ROLE.company, token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })
        res.status(200).json({
            message: "login sucessfully!",
            success: true,
        })
        
    } 
    catch(err){
        console.log(err);
        res.status(404).json({
            message: "invalid users",
            success: true,
        });
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

        const company = await CompanyModel.findOne({ email });
        if (!company) {
            return res.status(200).json({
                message: 'If this email exists, a verification code has been sent.',
                success: true,
            });
        }

        const now = Date.now();
        const lastRequestedAt = company.passwordResetRequestedAt
            ? new Date(company.passwordResetRequestedAt).getTime()
            : 0;

        if (lastRequestedAt && now - lastRequestedAt < 60 * 1000) {
            return res.status(429).json({
                message: 'Please wait 1 minute before requesting another code.',
                success: false,
            });
        }

        const code = String(Math.floor(100000 + Math.random() * 900000));
        const codeHash = await bcrypt.hash(code, 10);

        company.passwordResetCode = codeHash;
        company.passwordResetCodeExpires = new Date(now + 10 * 60 * 1000);
        company.passwordResetRequestedAt = new Date(now);
        await company.save();

        const emailResult = await sendPasswordResetEmail({
            to: company.email,
            name: company.name,
            code,
            accountType: 'company',
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

        const company = await CompanyModel.findOne({ email }).select(
            '+passwordResetCode +passwordResetCodeExpires +passwordResetRequestedAt'
        );

        if (!company || !company.passwordResetCode || !company.passwordResetCodeExpires) {
            return res.status(400).json({
                message: 'invalid or expired verification code',
                success: false,
            });
        }

        if (new Date(company.passwordResetCodeExpires).getTime() < Date.now()) {
            return res.status(400).json({
                message: 'verification code has expired',
                success: false,
            });
        }

        const isCodeValid = await bcrypt.compare(String(code), company.passwordResetCode);
        if (!isCodeValid) {
            return res.status(400).json({
                message: 'invalid or expired verification code',
                success: false,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt);

        company.password = passwordHash;
        company.passwordResetCode = undefined;
        company.passwordResetCodeExpires = undefined;
        company.passwordResetRequestedAt = undefined;
        await company.save();

        return res.status(200).json({
            message: 'password reset successfully',
            success: true,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});


// update company side
router.post('/update', isLogin('company'), async (req,res)=>{
    try{
        let {name,phone,location,currentpassword,newpassword} = req.body;
        const company = await CompanyModel.findOne({email:req.user.email});

        if(!company){
            return res.status(404).json({
                message: "company not found",
                success: false
            });
        }

        const updateData = {};
        if(typeof name === "string" && name.trim()){
            updateData.name = name.trim();
        }
        if(typeof phone === "string"){
            updateData.phone = phone.trim();
        }
        if(typeof location === "string"){
            updateData.location = location.trim();
        }

        if(newpassword){
            const isCurrentPasswordValid = await bcrypt.compare(currentpassword || "", company.password);
            if(!isCurrentPasswordValid){
                return res.status(401).json({
                    message: "current password is incorrect",
                    success: false
                });
            }

            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(newpassword, salt);
        }

        const updatedCompany = await CompanyModel.findOneAndUpdate(
            {email:req.user.email},
            updateData,
            {returnDocument: "after", runValidators: true}
        ).select("-password");

        res.status(200).json({
            message: "profile updated successfully",
            success: true,
            company: updatedCompany
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

// company profile
router.get('/profile', isLogin('company'), async (req,res)=>{
    try{
        const company = await CompanyModel.findOne({email:req.user.email}).select("-password");

        if(!company){
            return res.status(404).json({
                message: "company not found",
                success: false
            });
        }

        res.status(200).json({
            success: true,
            company
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





// get postjobs
router.get('/postjob', isLogin('company'), async (req,res)=>{
    try{
        const company = await CompanyModel.findOne({email:req.user.email}).populate('posts');
        res.json(company.posts);
    }
    catch(err){
        res.send(err)
    }
});

router.get('/appliedclients', isLogin('company'), async (req, res) => {
    try{
        const company = await CompanyModel.findOne({email: req.user.email});

        if(!company){
            return res.status(404).json({
                message: "company not found",
                success: false,
            });
        }

        const jobs = await JobModel.find({companyid: company._id})
            .populate('clientid', '-password')
            .populate('shortlistedClients', '-password');

        res.status(200).json({
            message: "applied clients fetched successfully",
            success: true,
            jobs
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "something went wrong",
            success: false,
        });
    }
});

router.post('/shortlist', isLogin('company'), async (req, res) => {
    try {
        const { jobId, clientId, shortlisted = true } = req.body;

        if (!jobId || !clientId) {
            return res.status(400).json({
                message: "jobId and clientId are required",
                success: false,
            });
        }

        const company = await CompanyModel.findOne({ email: req.user.email });
        if (!company) {
            return res.status(404).json({
                message: "company not found",
                success: false,
            });
        }

        const job = await JobModel.findOne({ _id: jobId, companyid: company._id });
        if (!job) {
            return res.status(404).json({
                message: "job not found for this company",
                success: false,
            });
        }

        const applicants = Array.isArray(job.clientid) ? job.clientid : [job.clientid];
        const hasApplied = applicants
            .filter(Boolean)
            .some((id) => String(id) === String(clientId));

        if (!hasApplied) {
            return res.status(400).json({
                message: "client has not applied for this job",
                success: false,
            });
        }

        let updatedJob;
        if (shortlisted) {
            updatedJob = await JobModel.findByIdAndUpdate(
                jobId,
                { $addToSet: { shortlistedClients: clientId } },
                { returnDocument: "after", runValidators: true }
            ).populate('shortlistedClients', '-password');
        } else {
            updatedJob = await JobModel.findByIdAndUpdate(
                jobId,
                { $pull: { shortlistedClients: clientId } },
                { returnDocument: "after", runValidators: true }
            ).populate('shortlistedClients', '-password');
        }

        res.status(200).json({
            message: shortlisted ? "candidate shortlisted successfully" : "candidate removed from shortlist",
            success: true,
            job: updatedJob,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "something went wrong",
            success: false,
        });
    }
});



// post jobs
router.post('/postjob', isLogin('company'), async (req,res)=>{
    let {title, category, payment, time, description} = req.body;

    const company = await CompanyModel.findOne({email:req.user.email});

    try{
        let job = await JobModel.create({
            title,
            category,
            payment,
            time,
            description,
            companyid: company._id,
        })
    
        company.posts.push(job._id);
        await company.save();
        res.json({
            message: "sucessfully",
            success: true,
        })

    }
    catch(err){
        console.log(err);
        res.send(err);
    }
});

// update posted job
router.put('/postjob/:jobId', isLogin('company'), async (req, res) => {
    try {
        const { jobId } = req.params;
        const { title, category, payment, time, description, status } = req.body;

        const company = await CompanyModel.findOne({ email: req.user.email });
        if (!company) {
            return res.status(404).json({
                message: "company not found",
                success: false,
            });
        }

        const updateData = {};

        if (typeof title === "string" && title.trim()) {
            updateData.title = title.trim();
        }

        if (typeof category === "string" && category.trim()) {
            updateData.category = category.trim();
        }

        if (payment !== undefined) {
            const parsedPayment = Number(payment);
            if (Number.isNaN(parsedPayment)) {
                return res.status(400).json({
                    message: "payment must be a valid number",
                    success: false,
                });
            }
            updateData.payment = parsedPayment;
        }

        if (time) {
            const parsedTime = new Date(time);
            if (Number.isNaN(parsedTime.getTime())) {
                return res.status(400).json({
                    message: "time must be a valid date",
                    success: false,
                });
            }
            updateData.time = parsedTime;
        }

        if (typeof description === "string") {
            updateData.description = description.trim();
        }

        if (status) {
            updateData.status = status;
        }

        const updatedJob = await JobModel.findOneAndUpdate(
            { _id: jobId, companyid: company._id },
            updateData,
            { returnDocument: "after", runValidators: true }
        );

        if (!updatedJob) {
            return res.status(404).json({
                message: "job not found for this company",
                success: false,
            });
        }

        res.status(200).json({
            message: "job updated successfully",
            success: true,
            job: updatedJob,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "something went wrong",
            success: false,
        });
    }
});

router.get('/messages', isLogin('company'), async (req, res) => {
    try {
        const company = await CompanyModel.findOne({ email: req.user.email });

        if (!company) {
            return res.status(404).json({
                message: 'company not found',
                success: false,
            });
        }

        const messages = await MessageModel.find({ companyId: company._id })
            .populate('clientId', 'firstname lastname email avatar')
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

router.get('/messages/recipients', isLogin('company'), async (req, res) => {
    try {
        const company = await CompanyModel.findOne({ email: req.user.email });

        if (!company) {
            return res.status(404).json({
                message: 'company not found',
                success: false,
            });
        }

        const jobs = await JobModel.find({ companyid: company._id }).populate(
            'clientid',
            'firstname lastname email avatar'
        );

        const recipientMap = new Map();

        jobs.forEach((job) => {
            const clients = Array.isArray(job.clientid) ? job.clientid : [job.clientid];
            clients.filter(Boolean).forEach((client) => {
                recipientMap.set(String(client._id), client);
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

router.get('/messages/:messageId', isLogin('company'), async (req, res) => {
    try {
        const company = await CompanyModel.findOne({ email: req.user.email });

        if (!company) {
            return res.status(404).json({
                message: 'company not found',
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
            { _id: messageId, companyId: company._id },
            { isReadByCompany: true },
            { returnDocument: 'after' }
        ).populate('clientId', 'firstname lastname email avatar');

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

router.post('/messages/send', isLogin('company'), async (req, res) => {
    try {
        const { clientId, subject, message } = req.body;

        if (!clientId || !subject || !message) {
            return res.status(400).json({
                message: 'clientId, subject and message are required',
                success: false,
            });
        }

        if (!mongoose.isValidObjectId(clientId)) {
            return res.status(400).json({
                message: 'invalid client id',
                success: false,
            });
        }

        const company = await CompanyModel.findOne({ email: req.user.email });
        if (!company) {
            return res.status(404).json({
                message: 'company not found',
                success: false,
            });
        }

        const client = await ClientModel.findById(clientId);
        if (!client) {
            return res.status(404).json({
                message: 'client not found',
                success: false,
            });
        }

        const createdMessage = await MessageModel.create({
            companyId: company._id,
            clientId,
            senderRole: 'company',
            subject: String(subject).trim(),
            message: String(message).trim(),
            isReadByCompany: true,
            isReadByClient: false,
        });

        const populatedMessage = await MessageModel.findById(createdMessage._id).populate(
            'clientId',
            'firstname lastname email avatar'
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

router.delete('/messages/:messageId', isLogin('company'), async (req, res) => {
    try {
        const company = await CompanyModel.findOne({ email: req.user.email });

        if (!company) {
            return res.status(404).json({
                message: 'company not found',
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
            companyId: company._id,
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

router.post('/upload', isLogin('company'), upload.single('image'), async (req, res) => {
    try {
        const company = await CompanyModel.findOne({ email: req.user.email });

        if (!company) {
            return res.status(404).json({
                message: 'company not found',
                success: false,
            });
        }

        if (!req.file?.filename) {
            return res.status(400).json({
                message: 'image file is required',
                success: false,
            });
        }

        const data = await CompanyModel.findOneAndUpdate(
            { email: req.user.email },
            { avatar: req.file.filename },
            { returnDocument: 'after', runValidators: true }
        ).select('-password');

        res.status(200).json({
            message: 'profile image uploaded successfully',
            success: true,
            company: data,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});

router.get('/payment/config', isLogin('company'), async (req, res) => {
    const keyId = String(process.env.RAZORPAY_KEY_ID || '').trim();

    if (!keyId) {
        return res.status(503).json({
            message: 'razorpay is not configured',
            success: false,
        });
    }

    return res.status(200).json({
        success: true,
        keyId,
    });
});

router.get('/payment/clients', isLogin('company'), async (req, res) => {
    try {
        const company = await CompanyModel.findOne({ email: req.user.email });
        if (!company) {
            return res.status(404).json({
                message: 'company not found',
                success: false,
            });
        }

        const pendingPayments = await PaymentModel.find({
            companyId: company._id,
            status: 'Pending',
        })
            .populate('clientId', 'firstname lastname email avatar')
            .sort({ createdAt: -1 });

        const recipientMap = new Map();
        pendingPayments.forEach((payment) => {
            if (!payment.clientId?._id) return;
            recipientMap.set(String(payment.clientId._id), payment.clientId);
        });

        return res.status(200).json({
            success: true,
            clients: Array.from(recipientMap.values()),
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});

router.get('/payment/history', isLogin('company'), async (req, res) => {
    try {
        const company = await CompanyModel.findOne({ email: req.user.email });
        if (!company) {
            return res.status(404).json({
                message: 'company not found',
                success: false,
            });
        }

        const payments = await PaymentModel.find({ companyId: company._id })
            .populate('clientId', 'firstname lastname email avatar')
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

router.post('/payment/create-order', isLogin('company'), async (req, res) => {
    try {
        const razorpayClient = getRazorpayClient();
        if (!razorpayClient) {
            return res.status(503).json({
                message: 'razorpay is not configured',
                success: false,
            });
        }

        const amount = Number(req.body?.amount);
        const clientId = String(req.body?.clientId || '').trim();
        const description = String(req.body?.description || '').trim();

        if (!Number.isFinite(amount) || amount <= 0) {
            return res.status(400).json({
                message: 'amount must be greater than 0',
                success: false,
            });
        }

        if (!mongoose.isValidObjectId(clientId)) {
            return res.status(400).json({
                message: 'valid clientId is required',
                success: false,
            });
        }

        const amountInPaise = Math.round(amount * 100);
        const company = await CompanyModel.findOne({ email: req.user.email });
        if (!company) {
            return res.status(404).json({
                message: 'company not found',
                success: false,
            });
        }

        const client = await ClientModel.findById(clientId);
        if (!client) {
            return res.status(404).json({
                message: 'client not found',
                success: false,
            });
        }

        const validClientConnection = await JobModel.findOne({
            companyid: company._id,
            clientid: client._id,
        });

        if (!validClientConnection) {
            return res.status(400).json({
                message: 'client is not linked with this company',
                success: false,
            });
        }

        const order = await razorpayClient.orders.create({
            amount: amountInPaise,
            currency: 'INR',
            receipt: `cmp_${Date.now()}`,
            notes: {
                companyEmail: req.user.email,
                companyName: company?.name || '',
                clientEmail: client.email || '',
            },
        });

        const existingPendingPayment = await PaymentModel.findOne({
            companyId: company._id,
            clientId: client._id,
            status: 'Pending',
            $or: [
                { razorpayOrderId: { $exists: false } },
                { razorpayOrderId: null },
                { razorpayOrderId: '' },
            ],
        }).sort({ createdAt: -1 });

        let payment;
        if (existingPendingPayment) {
            existingPendingPayment.amount = amount;
            existingPendingPayment.currency = 'INR';
            existingPendingPayment.description =
                description || existingPendingPayment.description || '';
            existingPendingPayment.razorpayOrderId = order.id;
            payment = await existingPendingPayment.save();
        } else {
            payment = await PaymentModel.create({
                companyId: company._id,
                clientId: client._id,
                amount,
                currency: 'INR',
                status: 'Pending',
                description,
                razorpayOrderId: order.id,
            });
        }

        return res.status(201).json({
            message: 'order created successfully',
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            paymentId: payment._id,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'failed to create order',
            success: false,
        });
    }
});

router.post('/payment/verify', isLogin('company'), async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body || {};

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                message: 'payment verification data is required',
                success: false,
            });
        }

        const keySecret = String(process.env.RAZORPAY_KEY_SECRET || '').trim();
        if (!keySecret) {
            return res.status(503).json({
                message: 'razorpay is not configured',
                success: false,
            });
        }

        const expectedSignature = crypto
            .createHmac('sha256', keySecret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (
            expectedSignature.length !== String(razorpay_signature).length ||
            !crypto.timingSafeEqual(
                Buffer.from(expectedSignature),
                Buffer.from(String(razorpay_signature))
            )
        ) {
            return res.status(400).json({
                message: 'invalid payment signature',
                success: false,
            });
        }

        const company = await CompanyModel.findOne({ email: req.user.email });
        if (!company) {
            return res.status(404).json({
                message: 'company not found',
                success: false,
            });
        }

        const payment = await PaymentModel.findOneAndUpdate(
            {
                companyId: company._id,
                razorpayOrderId: razorpay_order_id,
            },
            {
                status: 'Success',
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: String(razorpay_signature),
                paidAt: new Date(),
            },
            { returnDocument: 'after', runValidators: true }
        ).populate('clientId', 'firstname lastname email avatar');

        if (!payment) {
            return res.status(404).json({
                message: 'payment record not found',
                success: false,
            });
        }

        return res.status(200).json({
            message: 'payment verified successfully',
            success: true,
            payment: {
                _id: payment._id,
                paymentId: payment.razorpayPaymentId,
                orderId: payment.razorpayOrderId,
                amount: payment.amount,
                status: payment.status,
                paidAt: payment.paidAt,
                client: payment.clientId,
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'payment verification failed',
            success: false,
        });
    }
});

// logout company
router.post('/logout', (req,res)=>{
    try{
        res.clearCookie(TOKEN_COOKIE_BY_ROLE.company, {
        httpOnly: true,
        secure: false,     
        sameSite: "lax"
        });
        res.clearCookie("token", {
        httpOnly: true,
        secure: false,     
        sameSite: "lax"
        });

        res.json({
            message: "user logout sucessfully!",
            success: true,
        })
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})




module.exports = router;
