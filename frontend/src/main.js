document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username);
        window.location.href = 'index.html';
    }
});
