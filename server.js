require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); // DB connection import
const cors = require('cors');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Use Central API Route
app.use('/api', require('./routes/api'));

// Base Route
app.get('/', (req, res) => {
    res.send("CINHUB Backend API is Live & Secured! 🚀");
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    