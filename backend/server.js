require('dotenv').config({ quiet: true });
const express = require('express');
const app = express();
const cors = require('cors');
const cookieparser = require('cookie-parser');
const path = require('path');

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    const isLocalhostOrigin =
      typeof origin === 'string' &&
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);

    if (!origin || allowedOrigins.includes(origin) || isLocalhostOrigin) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

require('./config/db');

app.use('/uploads', express.static(path.join(__dirname, 'public/temp/')));

const adminRoutes = require('./routes/adminroutes');
const companyRoutes = require('./routes/companyroutes');
const clientRoutes = require('./routes/clientroutes');
const jobRoutes = require('./routes/jobroutes');

app.get('/', (req, res) => {
  res.send('welcome to the backend');
});

app.use('/admin', adminRoutes);
app.use('/company', companyRoutes);
app.use('/client', clientRoutes);
app.use('/job', jobRoutes);

app.use((req, res) => {
  res.status(401).send('something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on address http://localhost:${PORT}`);
});
