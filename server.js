require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cryptoRoutes = require('./routes/cryptoRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
    origin: [process.env.FRONTEND_URL], 
    credentials: true, 
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/api', (req, res) => {
    res.send("Welcome to the Crypto App API!" );
});
app.use('/api/auth', authRoutes);
app.use('/api/crypto', cryptoRoutes);

// Error Handler Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
