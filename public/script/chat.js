const socket = window.io();

const buttonMessage = document.querySelector('.mensagem__btn');
const inputMessage = document.querySelector('.mensagem__input');

const nick = '';

buttonMessage.addEventListener('click', (event) => {
  event.preventDefault();
  
  const nickname = nick || socket.id.slice(0, 16);
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
});

const sendMessage = (message) => {
  const chat = document.querySelector('.webchat__mensagens');
  const li = document.createElement('li');
  li.innerText = message;
  chat.appendChild(li);
};

socket.on('message', (msg) => sendMessage(msg));