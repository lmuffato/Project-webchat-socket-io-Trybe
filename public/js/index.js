const socket = window.io();

window.onload = () => {
  const randomUser = Array
    .from(Array(16), () => Math.floor(Math.random() * 36).toString(36)).join('');

  document.querySelector('#online-user').innerText = randomUser;
};

const sendButton = document.querySelector('#send-button');

sendButton.addEventListener('click', (e) => {
  e.preventDefault();

  const messageBox = document.querySelector('#message-box');
  const onlineUser = document.querySelector('#online-user');

  const data = { chatMessage: messageBox.value, nickname: onlineUser.innerText };

  messageBox.value = '';

  socket.emit('message', data);
});

const nickNameButton = document.querySelector('#nickname-button');

nickNameButton.addEventListener('click', (e) => {
  e.preventDefault();
  
  const nicknameBox = document.querySelector('#nickname-box');
  const onlineUser = document.querySelector('#online-user');

  onlineUser.innerText = nicknameBox.value;

  nicknameBox.value = '';
});

const createMessage = (message) => {
  const chat = document.querySelector('#chat');

  chat.innerHTML += `<li data-testid="message">${message}</li>`;
};

socket.on('message', (message) => createMessage(message));
