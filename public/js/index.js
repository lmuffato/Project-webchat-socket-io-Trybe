const socket = window.io();

const sendButton = document.querySelector('#send-button');
const nickNameButton = document.querySelector('#nickname-button');
const usersList = document.querySelector('#users-list');

const getUpdatedOnlineUser = () => document.querySelector('.online-user');

window.onload = () => {
  const randomUser = Array
    .from(Array(16), () => Math.floor(Math.random() * 36).toString(36)).join('');

    const onlineUser = getUpdatedOnlineUser();

    socket.emit('updateUser', randomUser);

    onlineUser.innerText = randomUser;
};

const displayUsers = (connectedUsers) => {
  console.log(connectedUsers);
  const currentUser = getUpdatedOnlineUser().innerText;
  usersList.innerHTML = '';

  connectedUsers.forEach((user) => {
    const newUser = document.createElement('li');

    newUser.setAttribute('data-testid', 'online-user');
    newUser.setAttribute('class', 'online-user');
    newUser.innerText = user;

    if (currentUser === user) {
      usersList.prepend(newUser);
    } else {
      usersList.appendChild(newUser);
    }
  });
};

socket.on('connectedUsers', (connectedUsers) => {
  displayUsers(connectedUsers);
});

sendButton.addEventListener('click', (e) => {
  e.preventDefault();

  const messageBox = document.querySelector('#message-box');
  const onlineUser = getUpdatedOnlineUser();

  const data = { chatMessage: messageBox.value, nickname: onlineUser.innerText };

  messageBox.value = '';

  socket.emit('message', data);
});

nickNameButton.addEventListener('click', (e) => {
  e.preventDefault();
  
  const nicknameBox = document.querySelector('#nickname-box');
  const onlineUser = getUpdatedOnlineUser();

  onlineUser.innerText = nicknameBox.value;

  socket.emit('updateUser', onlineUser.innerText);

  nicknameBox.value = '';
});

const createMessage = (message) => {
  const chat = document.querySelector('#chat');

  const newMessage = document.createElement('li');
  newMessage.innerText = message;
  newMessage.setAttribute('data-testid', 'message');

  chat.appendChild(newMessage);
};

socket.on('message', (message) => createMessage(message));
