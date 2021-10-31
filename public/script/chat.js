const socket = window.io();

const buttonMessage = document.querySelector('.mensagem__btn');
const inputMessage = document.querySelector('.mensagem__input');

buttonMessage.addEventListener('click', (event) => {
  event.preventDefault();
  
  socket.emit('message', { chatMessage: inputMessage.value, nickname: socket.id.slice(1, 17) });
});

const sendMessage = (message) => {
  const chat = document.querySelector('.webchat__mensagens');
  const li = document.createElement('li');
  li.innerText = message;
  chat.appendChild(li);
};

socket.on('message', (msg) => sendMessage(msg));