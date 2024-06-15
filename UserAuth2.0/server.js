// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const teamRoutes = require('./routes/team');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const server = http.createServer(app);
const io = socketIo(server);


app.use('/api/auth', authRoutes);
app.use('/api/team', require('./routes/team'));

app.use(express.static(path.join(__dirname, '../Pandavas')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Pandavas/reg.html'));
});


// Connect to MongoDB
mongoose.connect("mongodb+srv://ayushsoni:ayush4521@cluster1.6cn2qee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err.message);
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', (room) => {
        socket.join(room);
        socket.to(room).emit('message','A user has joined the chat');
    });

    socket.on('chatMessage', (msg, room) => {
        io.to(room).emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
