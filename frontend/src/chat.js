const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const chat = document.getElementById("chat");

// Obter nome de usuário da URL
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

if (username) {
    socket.emit("setUsername", username);
} else {
    window.location.href = 'index.html'; // Redireciona para a tela de login se o nome de usuário não estiver definido
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    const message = `${username}:${input.value}`;
    socket.emit("chatMessage", message);
    input.value = "";
  }
});

socket.on("userJoined", (username) => {
  const item = document.createElement("li");
  item.textContent = `${username} Entrou no chat`;
  chat.appendChild(item);
  scrollToBottom();
});

socket.on("chatMessage", async (msg) => {
  if (typeof msg === 'string') {
    const [msgUsername, msgText] = msg.split(':');
    const item = document.createElement("li");
    const isSentMessage = msgUsername === username;

    item.classList.add(isSentMessage ? "sent" : "received");
    item.innerHTML = `<strong>${msgUsername}:</strong> ${msgText}`;
    chat.appendChild(item);
    scrollToBottom();

    // Verifica se a mensagem contém palavras correspondentes aos sons e faz solicitações para as APIs de imagem
    if (msgText.toLowerCase().includes("img cat")) {
      try {
        const response = await fetch('/api/cat');
        const data = await response.json();
        const imageUrl = data.imageUrl;
        const imgItem = document.createElement("li");
        imgItem.innerHTML = `<img src="${imageUrl}" alt="cat image">`;
        chat.appendChild(imgItem);
        scrollToBottom();
      } catch (error) {
        console.error('Error fetching cat image:', error);
      }
    }
  }
});

function scrollToBottom() {
  chat.scrollTop = chat.scrollHeight;
}
