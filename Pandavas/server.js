const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let tasks = [];

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

app.get('/', (req, res) => {
  res.send('Real-time Notification Server is running');
});

server.listen(4000, () => console.log('Server is running on port 4000'));
