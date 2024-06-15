document.addEventListener('DOMContentLoaded', function () {
    const socket = io();
    const messages = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const username = localStorage.getItem('username');

    function addMessage(message, isUser) {
        const messageElement = document.createElement('li');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user' : 'other');
        messageElement.textContent = message;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    }

    document.getElementById('message-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && messageInput.value.trim() !== '') {
            const message = messageInput.value;
            socket.emit('chat message', { message, username });
            addMessage(`${username}: ${message}`, true);
            messageInput.value = '';
        }
    });

    socket.on('chat message', function (data) {
        if (data.username !== username) {
            addMessage(`${data.username}: ${data.message}`, false);
        }
    });
});
