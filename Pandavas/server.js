const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let tasks = [];

// Serve static files from the current directory
app.use(express.static(__dirname));

// Modify the root route to send login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('newTask', (task) => {
    tasks.push(task);
    io.emit('taskNotification', task);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => console.log('Server is running on port 4000'));
