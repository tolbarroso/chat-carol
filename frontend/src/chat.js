document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const form = document.getElementById("form");
    const input = document.getElementById("input");
    const chat = document.getElementById("chat");

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (!username) {
        window.location.href = 'index.html';
    } else {
        socket.emit("setUsername", username);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (input.value) {
            const message = `${username}:${input.value}`;
            console.log('Sending message:', message);
            socket.emit("chatMessage", message);
            input.value = "";
        }
    });

    socket.on("userJoined", (username) => {
        const item = document.createElement("li");
        item.textContent = `${username} entrou no chat`;
        chat.appendChild(item);
        scrollToBottom();
    });

    socket.on("chatMessage", (msg) => {
        console.log('Received message:', msg);
        const [msgUsername, msgText] = msg.split(':');
        const item = document.createElement("li");
        const isSentMessage = msgUsername === username;

        item.classList.add(isSentMessage ? "sent" : "received");
        item.innerHTML = `<strong>${msgUsername}</strong>: ${msgText}`;
        chat.appendChild(item);
        scrollToBottom();
    });

    function scrollToBottom() {
        chat.scrollTop = chat.scrollHeight;
    }
});
