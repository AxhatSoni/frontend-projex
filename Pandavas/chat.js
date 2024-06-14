// This script will be expanded as needed for more functionality

document.addEventListener('DOMContentLoaded', () => {
    const chatListItems = document.querySelectorAll('.chat-list-item');
    const chatContentPlaceholder = document.querySelector('.chat-content-placeholder');

    chatListItems.forEach(item => {
        item.addEventListener('click', () => {
            chatContentPlaceholder.textContent = 'This is a chat with ' + item.querySelector('h3').textContent + '.';
        });
    });
});
