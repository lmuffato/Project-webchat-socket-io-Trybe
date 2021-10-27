const socket = window.io();

const messagesList = document.querySelector('.messages-list');
const inputMessage = document.querySelector('.messageInput');
const button = document.querySelector('.send-button');

const createMessage = (message) => {
  const p = document.createElement('p');
  p.innerText = message;
  messagesList.appendChild(p);
};

const nick = '';

button.addEventListener('click', (ev) => {
  ev.preventDefault();
  const msgData = { nickname: nick || socket.id, chatMessage: inputMessage.value };
  inputMessage.value = '';
  socket.emit('message', msgData);
  // console.log(msgData);
});

socket.on('allMessages', () => {

});

socket.on('message', (data) => {
  createMessage(data);
});
