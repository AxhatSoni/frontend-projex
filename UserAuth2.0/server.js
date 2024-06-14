// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://ayushsoni:ayush4521@cluster1.6cn2qee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err.message);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend-projex/Pandavas/login')));

// Routes
app.use('/api/auth', require('./routes/auth'));// Add this line

const PORT = process.env.PORT || 5500;

app.listen(5500, () => {
    console.log(`Server running on port ${PORT}`);
});
