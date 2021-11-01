const socket = window.io();

const form = document.getElementById('form');
const messages = document.getElementById('messages');
const users = document.getElementById('users');
const messageBox = document.getElementById('message-box');
const nicknameBox = document.getElementById('nickname-box');
const nicknameButton = document.getElementById('nickname-button');
let nickname = '';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('message', {
    chatMessage: messageBox.value,
    nickname,
  });
  messageBox.value = '';
});

nicknameButton.addEventListener('click', () => {
  nickname = nicknameBox.value;
  nicknameBox.value = '';
  socket.emit('setNewNickname', nickname);
});

const createNewMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messages.appendChild(li);
};

const createUser = (newNickname) => {
  nickname = newNickname;
  socket.emit('updateUserList');
};

const updateUsers = (user) => {
  const li = document.createElement('li');
  li.innerText = user.nickname;
  li.setAttribute('data-testid', 'online-user');
  users.appendChild(li);
};

const setUserList = (userList) => {
  users.innerHTML = '';
  const clientUser = userList.find((user) => user.id === socket.id);
  updateUsers(clientUser);
  userList.forEach((user) => user.id !== socket.id && updateUsers(user));
};

const getMessageList = (messageList) => {
  messageList.forEach((message) => {
    createNewMessage(
      `${message.timestamp} - ${message.nickname}: ${message.message}`,
    );
  });
};

socket.on('message', createNewMessage);
socket.on('newUser', createUser);
socket.on('updateUserList', setUserList);
socket.on('getMessages', getMessageList);
