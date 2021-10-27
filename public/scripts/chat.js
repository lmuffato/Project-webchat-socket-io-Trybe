// arquivo criado com ajuda do guia:
// https://app.betrybe.com/course/back-end/sockets/sockets-socketio/7eba74a2-260a-4a4d-954e-14d8cc7a9d92/conteudo/20a6c196-10d9-4db5-b20c-cfe68b3dd1d0/construindo-um-chat-com-socketio/d48e7081-f992-4a5f-ba1b-0fe28dd08967?use_case=side_bar

// add socket

const socket = window.io();

// listando os elementos
const msgInput = document.getElementById('msgInput');
const sendButton = document.getElementById('sendButton');

// função para add msg na UL
const createMessage = (message) => {
  const chat = document.querySelector('.chat');
  const li = document.createElement('li');
  li.innerText = message;
  chat.appendChild(li);
};

// add evento no sendButton
sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  const chatMessage = msgInput.value;
  const nickname = 'vin';
  socket.emit('message', { chatMessage, nickname });
  msgInput.value = '';
});

// listen event
socket.on('message', (msg) => {
  createMessage(msg);
  console.log(msg);
});
