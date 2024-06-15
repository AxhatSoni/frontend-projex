document.addEventListener('DOMContentLoaded' , () => {
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const loginAlert = document.getElementById('login-alert');
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            loginAlert.textContent = 'User logged in successfully';
            loginAlert.style.color = 'green';
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            window.location.href = '/home.html';
        } else {
            loginAlert.textContent = data.error || 'Login failed, Please try again ';
            loginAlert.style.color = 'red';
        }
    } catch (err) {
        loginAlert.textContent = 'Failed to login. Please try again.';
        loginAlert.style.color = 'red';
    }
});
});