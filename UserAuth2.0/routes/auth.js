const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { username, email, password} = req.body;

    if(password != confirmPassword) {
        return res.status(400).json({message: 'Passwords do not match'});
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        
        user = new User({ username, email, password: hashedPassword });
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // const payload = {user : {id: user.id}};
        // const token = jwt.sign(payload,"MYNAMEISAYUSHSONISTUDENTOFCOMPUTERSCIENCEENGINEER1234567" , {expiresIn : '1h'} );

        res.status(201).json({ msg: 'User registered successfully', username });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, "MYNAMEISAYUSHSONISTUDENTOFCOMPUTERSCIENCEENGINEER1234567", { expiresIn: '1h' });

        res.json({ msg: 'User logged in successfully', token, username: user.username });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;