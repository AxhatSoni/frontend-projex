document.addEventListener('DOMContentLoaded', () => {
    const dismissBtn = document.querySelector('.dismiss-btn');
    const notification = document.querySelector('.notification');
    const dropbtn = document.querySelector('.dropbtn');
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');

    dismissBtn.addEventListener('click', () => {
        notification.style.display = 'none';
    });

    dropbtn.addEventListener('click', () => {
        dropdown.classList.toggle('active');
        if (dropdown.classList.contains('active')) {
            dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 'px';
        } else {
            dropdownContent.style.maxHeight = '0';
        }
    });
});
