document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const registerAlert = document.getElementById('register-alert');

    if(password !== confirmPassword ) {
        registerAlert.textContent = 'Passwords do not match';
        registerAlert.style.color = 'red';
        return;
    }

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();
        if (res.ok) {
            registerAlert.textContent = "Registration successful!";
            registerAlert.style.color = 'green';
            localStorage.setItem('username', data.username);
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1000);
            
        } else {
            registerAlert.textContent = data.message || 'Error during registration';
            registerAlert.style.color = 'red';
        }
    } catch (err) {
        console.error(err);
        registerAlert.textContent = 'Failed to register, Pleaser try again';
        registerAlert.style.color = 'red';
    }
});

