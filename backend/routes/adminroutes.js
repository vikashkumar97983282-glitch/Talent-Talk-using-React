const express = require('express');
const router = express.Router();
const AdminModel = require('../models/adminmodels')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isLogin = require('../utils/registerCookies');
const { TOKEN_COOKIE_BY_ROLE } = require('../utils/registerCookies');
const upload = require('../middleware/fileupload');
const ClientModel = require('../models/clientmodels');
const CompanyModel = require('../models/companymodels');
const JobModel = require('../models/jobsmodel');
const PaymentModel = require('../models/paymentmodel');
const mongoose = require('mongoose');


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

router.get('/dashboard', isLogin('admin'), async (req, res) => {
    try {
        const [totalClients, totalCompanies, totalJobs, totalPayments, payments, recentJobs] = await Promise.all([
            ClientModel.countDocuments(),
            CompanyModel.countDocuments(),
            JobModel.countDocuments(),
            PaymentModel.countDocuments(),
            PaymentModel.find().sort({ createdAt: -1 }),
            JobModel.find().sort({ updatedAt: -1 }).limit(6),
        ]);

        const totalUsers = totalClients + totalCompanies;
        const activeUsers = await JobModel.distinct('clientid');
        const newUsers = await ClientModel.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        });

        const revenue = payments
            .filter((payment) => payment.status === 'Success')
            .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

        const pendingPayouts = payments
            .filter((payment) => payment.status === 'Pending')
            .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

        const recentActivity = recentJobs.map((job) => ({
            project: job.title || 'Untitled Project',
            status: job.status || 'initial',
            time: job.updatedAt,
        }));

        return res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                activeUsers: activeUsers.length,
                newUsers,
                totalJobs,
                totalCompanies,
                totalPayments,
                revenue,
                pendingPayouts,
            },
            recentActivity,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});

router.get('/users', isLogin('admin'), async (req, res) => {
    try {
        const users = await ClientModel.find()
            .sort({ createdAt: -1 })
            .select('firstname lastname email profession avatar createdAt');

        const data = users.map((user) => ({
            id: user._id,
            name: `${user.firstname || ''} ${user.lastname || ''}`.trim() || 'Unknown User',
            role: user.profession || 'Client',
            status: 'Active',
            department: 'Client',
            avatar: user.avatar ? `/uploads/${user.avatar}` : '',
            createdAt: user.createdAt,
            email: user.email || '',
        }));

        return res.status(200).json({
            success: true,
            users: data,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});

router.get('/companies', isLogin('admin'), async (req, res) => {
    try {
        const companies = await CompanyModel.find()
            .sort({ createdAt: -1 })
            .select('name email location avatar createdAt');

        const data = companies.map((company) => ({
            id: company._id,
            name: company.name || 'Unknown Company',
            category: company.location || 'Company',
            description: company.email || 'No description available',
            image: company.avatar ? `/uploads/${company.avatar}` : '',
            createdAt: company.createdAt,
        }));

        return res.status(200).json({
            success: true,
            companies: data,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});

router.get('/jobs', isLogin('admin'), async (req, res) => {
    try {
        const jobs = await JobModel.find()
            .populate('companyid', 'name')
            .sort({ createdAt: -1 });

        const data = jobs.map((job) => {
            const company = Array.isArray(job.companyid) ? job.companyid[0] : job.companyid;
            const statusLabel = job.status === 'complete'
                ? 'Approved'
                : job.status === 'progress'
                    ? 'Pending'
                    : 'Pending';

            return {
                id: job._id,
                title: job.title || 'Untitled Job',
                description: job.description || 'No description available',
                status: statusLabel,
                companyName: company?.name || 'Unknown Company',
                image: '',
                time: job.time,
            };
        });

        return res.status(200).json({
            success: true,
            jobs: data,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});

router.get('/payments', isLogin('admin'), async (req, res) => {
    try {
        const payments = await PaymentModel.find()
            .populate('companyId', 'name')
            .populate('clientId', 'firstname lastname')
            .sort({ createdAt: -1 });

        const totalRevenue = payments
            .filter((payment) => payment.status === 'Success')
            .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

        const pendingPayouts = payments
            .filter((payment) => payment.status === 'Pending')
            .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

        const data = payments.map((payment) => ({
            id: payment._id,
            transactionId: payment.razorpayPaymentId || payment.razorpayOrderId || String(payment._id),
            client: `${payment.clientId?.firstname || ''} ${payment.clientId?.lastname || ''}`.trim() || 'Unknown Client',
            freelancer: payment.companyId?.name || 'Unknown Company',
            amount: Number(payment.amount || 0),
            currency: payment.currency || 'INR',
            date: payment.createdAt,
            status: payment.status || 'Pending',
        }));

        return res.status(200).json({
            success: true,
            summary: {
                totalRevenue,
                pendingPayouts,
            },
            payments: data,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});

router.get('/insights', isLogin('admin'), async (req, res) => {
    try {
        const [payments, totalClients, totalCompanies, totalJobs] = await Promise.all([
            PaymentModel.find(),
            ClientModel.countDocuments(),
            CompanyModel.countDocuments(),
            JobModel.countDocuments(),
        ]);

        const successPayments = payments.filter((payment) => payment.status === 'Success');
        const revenue = successPayments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
        const activeBids = await JobModel.countDocuments({ status: { $in: ['initial', 'progress'] } });
        const completionCount = await JobModel.countDocuments({ status: 'complete' });
        const completionRate = totalJobs > 0 ? Math.round((completionCount / totalJobs) * 100) : 0;

        const userBase = totalClients + totalCompanies;
        const newUsersLast30d = (await ClientModel.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        })) + (await CompanyModel.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }));
        const userGrowth = userBase > 0 ? ((newUsersLast30d / userBase) * 100).toFixed(1) : '0.0';

        const cards = [
            { title: 'Revenue', value: `${revenue.toFixed(2)} INR`, change: 'Live' },
            { title: 'User Growth', value: `+${userGrowth}%`, change: '30d' },
            { title: 'Project Completion', value: `${completionRate}%`, change: 'Live' },
            { title: 'Active Bids', value: String(activeBids), change: 'Live' },
        ];

        return res.status(200).json({
            success: true,
            cards,
            meta: {
                totalUsers: userBase,
                totalJobs,
                completedJobs: completionCount,
                successfulPayments: successPayments.length,
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});

router.get('/invoices', isLogin('admin'), async (req, res) => {
    try {
        const payments = await PaymentModel.find()
            .populate('companyId', 'name email')
            .populate('clientId', 'firstname lastname email')
            .sort({ createdAt: -1 });

        const invoices = payments.map((payment, index) => ({
            id: payment._id,
            invoiceNumber: `INV-${String(index + 1).padStart(5, '0')}`,
            status: payment.status || 'Pending',
            amount: Number(payment.amount || 0),
            currency: payment.currency || 'INR',
            clientName: `${payment.clientId?.firstname || ''} ${payment.clientId?.lastname || ''}`.trim() || 'Unknown Client',
            clientEmail: payment.clientId?.email || '',
            companyName: payment.companyId?.name || 'Unknown Company',
            companyEmail: payment.companyId?.email || '',
            description: payment.description || '',
            createdAt: payment.createdAt,
            paidAt: payment.paidAt || null,
            paymentId: payment.razorpayPaymentId || '',
        }));

        return res.status(200).json({
            success: true,
            invoices,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'something went wrong',
            success: false,
        });
    }
});

router.post('/invoices', isLogin('admin'), async (req, res) => {
    try {
        const { companyId, clientId, amount, description, currency } = req.body || {};

        if (!companyId || !clientId || amount === undefined) {
            return res.status(400).json({
                message: 'companyId, clientId and amount are required',
                success: false,
            });
        }

        if (!mongoose.isValidObjectId(companyId) || !mongoose.isValidObjectId(clientId)) {
            return res.status(400).json({
                message: 'invalid companyId or clientId',
                success: false,
            });
        }

        const numericAmount = Number(amount);
        if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
            return res.status(400).json({
                message: 'amount must be greater than 0',
                success: false,
            });
        }

        const [company, client] = await Promise.all([
            CompanyModel.findById(companyId),
            ClientModel.findById(clientId),
        ]);

        if (!company || !client) {
            return res.status(404).json({
                message: 'company or client not found',
                success: false,
            });
        }

        const payment = await PaymentModel.create({
            companyId,
            clientId,
            amount: numericAmount,
            currency: String(currency || 'INR').trim() || 'INR',
            status: 'Pending',
            description: String(description || '').trim(),
        });

        return res.status(201).json({
            message: 'invoice created successfully',
            success: true,
            invoice: payment,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
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
