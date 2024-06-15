// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../Pandavas')));

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


// Route to serve login.html

// API Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Pandavas/reg.html'));
});


const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
