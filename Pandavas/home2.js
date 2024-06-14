document.addEventListener('DOMContentLoaded', () => {
    const dismissBtn = document.querySelector('.dismiss-btn');
    const notification = document.querySelector('.notification');

    dismissBtn.addEventListener('click', () => {
        notification.style.display = 'none';
    });

    const socket = io('http://localhost:4000');

    socket.on('taskNotification', (task) => {
        showNotification(`New Task: ${task.title} - Deadline: ${task.deadline}`);
    });

    function showNotification(message) {
        const notificationBox = document.createElement('div');
        notificationBox.className = 'notification';
        notificationBox.innerHTML = `
            <h4>New Task</h4>
            <p>${message}</p>
            <button class="dismiss-btn">Dismiss</button>
        `;
        document.body.appendChild(notificationBox);

        const dismissBtn = notificationBox.querySelector('.dismiss-btn');
        dismissBtn.addEventListener('click', () => {
            notificationBox.style.display = 'none';
        });
    }
});
