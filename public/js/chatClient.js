const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  const nickname = socket.id;
  socket.emit('message', { chatMessage, nickname });
  inputMessage.value = '';
  return false;
});

const serverMessage = (message) => {
  // const { chatMessage, nickname } = data;
  // const currDate = new Date().toString();
  // const currHour = new Date().toTimeString();
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

// socket.on('serverMessage', (message) => serverMessage(message));
socket.on('message', (message) => serverMessage(message));

window.onbeforeunload = () => {
  socket.disconnect();
};