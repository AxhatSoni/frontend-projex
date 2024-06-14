document.addEventListener('DOMContentLoaded', () => {
    const phoneNumber = document.getElementById('phoneNumber');
    const dialpadButtons = document.querySelectorAll('.dialpad button');
    const callButton = document.getElementById('callButton');
    const interceptButton = document.getElementById('interceptButton');

    dialpadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.querySelector('.number').textContent;
            phoneNumber.value += value;
        });
    });

    callButton.addEventListener('click', () => {
        alert(`Calling ${phoneNumber.value}`);
    });

    interceptButton.addEventListener('click', () => {
        phoneNumber.value = ''; // Clear the phone number
    });

    // Prevent non-numeric input in the text box
    phoneNumber.addEventListener('input', (e) => {
        phoneNumber.value = phoneNumber.value.replace(/[^0-9*#+]/g, '');
    });
});
