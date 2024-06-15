document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const room = 'general'; // You can change this to allow dynamic room names
    socket.emit('joinRoom', room);

    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messages = document.getElementById('messages');

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        if (message) {
            socket.emit('chatMessage', message, room);
            messageInput.value = '';
        }
    });

    socket.on('message', (msg) => {
        const item = document.createElement('div');
        item.textContent = msg;
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    });
});