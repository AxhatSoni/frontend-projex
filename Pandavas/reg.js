document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const registerAlert = document.getElementById('register-alert');
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
            window.location.href = '/home.html';
        } else {
            registerAlert.textContent = data.msg;
            registerAlert.style.color = 'red';
        }
    } catch (err) {
        console.error(err);
    }
});

