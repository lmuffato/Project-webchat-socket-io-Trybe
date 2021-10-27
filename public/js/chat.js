const socket = window.io();

const messagesList = document.querySelector('.messages-list');
const inputMessage = document.querySelector('.messageInput');
const button = document.querySelector('.send-button');

const createMessage = (message) => {
  const p = document.createElement('p');
  p.innerText = message;
  p.setAttribute('data-testid', 'message');
  messagesList.appendChild(p);
};

const nick = document.querySelector('.nicknameInput');

button.addEventListener('click', (ev) => {
  ev.preventDefault();
  const generateNickname = nick.value || socket.id;
  const msgData = { nickname: generateNickname.substring(0, 16), chatMessage: inputMessage.value };
  inputMessage.value = '';
  socket.emit('message', msgData);
  // console.log(msgData);
});

// socket.on('refreshAllMessages', (data) => {
//   // console.log(data, 'data');
//   data.forEach((item) => {
//     const { message, nickname, timestamp } = item;
//     const formatMsg = `${timestamp} - ${nickname}: ${message}`;
//     createMessage(formatMsg);
//   });
//   // socket.emit('refreshAllMessages', data);
// });

socket.on('message', (data) => {
  createMessage(data);
});
