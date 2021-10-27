const socket = window.io();
const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', inputMessage.value);
  inputMessage.value = '';
  return false;
});

const createMessage = (chatMessage) => {
  console.log(chatMessage);
  const messageUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerHTML = chatMessage;
  messageUl.appendChild(li);
};

window.onbeforeunload = () => {
  socket.disconnect();
};

socket.on('message', (chatMessage) => createMessage(chatMessage));
