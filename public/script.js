const socket = window.io();
const button = document.querySelector('#pingButton');
console.log(button);

button.addEventListener('click', () => {
  const input = document.querySelector('#message-input');
  socket.emit('message', { chatMessage: input.value, nickname: socket.id });
  input.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
