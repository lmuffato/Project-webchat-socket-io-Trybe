const socket = window.io();

const getUpdatedOnlineUser = () => document.querySelector('#online-user');

window.onload = () => {
  const randomUser = Array
    .from(Array(16), () => Math.floor(Math.random() * 36).toString(36)).join('');

    getUpdatedOnlineUser().innerText = randomUser;
};

const sendButton = document.querySelector('#send-button');

sendButton.addEventListener('click', (e) => {
  e.preventDefault();

  const messageBox = document.querySelector('#message-box');
  const onlineUser = getUpdatedOnlineUser();

  const data = { chatMessage: messageBox.value, nickname: onlineUser.innerText };

  messageBox.value = '';

  socket.emit('message', data);
});

const nickNameButton = document.querySelector('#nickname-button');

nickNameButton.addEventListener('click', (e) => {
  e.preventDefault();
  
  const nicknameBox = document.querySelector('#nickname-box');
  const onlineUser = getUpdatedOnlineUser();

  onlineUser.innerText = nicknameBox.value;

  nicknameBox.value = '';
});

const createMessage = (message) => {
  const chat = document.querySelector('#chat');

  chat.innerHTML += `<li data-testid="message">${message}</li>`;
};

socket.on('message', (message) => createMessage(message));
