const username = localStorage.getItem('username');
if (!username) {
    window.location.href = 'login.html';
}

const socket = io('http://localhost:3000'); // Certifique-se de que o servidor está rodando no mesmo endereço
const chatWindow = document.getElementById('chat-window');
const output = document.getElementById('output');
const messageInput = document.getElementById('message');

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && messageInput.value.trim() !== '') {
        const message = messageInput.value.trim();
        socket.emit('chatMessage', { username, message });
        messageInput.value = '';
    }
});

socket.on('chatMessage', (data) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(data.username === username ? 'me' : 'other');
    messageElement.innerHTML = `<span class="username">${data.username}</span>: ${data.message}`;
    output.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
});
