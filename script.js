const socket = window.io();

const form = document.querySelector('form');
const chatText = document.getElementById('text-input');
// const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('message-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('message', chatText.value);
  chatText.value = '';
  return false;
});

const createMessage = (msg) => {
  const messageLi = document.createElement('li');
  messageLi.innerText = msg;
  chatMessages.appendChild(messageLi);
};

socket.on('message-server', (serverReturn) => {
  console.log(serverReturn);
  createMessage(serverReturn.message);
});