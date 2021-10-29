const socket = window.io();

const form = document.getElementById('form');
const inputMessage = document.getElementById('messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', 
  { chatMessage: inputMessage.value, nickname: socket.id });
  inputMessage.value = '';
});

const createMessage = (message) => {
  const messagesUl = document.getElementById('messages');
  const li = document.createElement('li');
  li.innerHTML = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));