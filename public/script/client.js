const socket = window.io();

const sendButton = document.querySelector('#sendButton');
const inputMessage = document.querySelector('#messageBox');
const saveButton = document.querySelector('#nicknameButton');
const inputNickname = document.querySelector('#nicknameBox');

const DATA_TESTID = 'data-testid';
const ID = 'id';
const CLASS = 'class';

let nick = '';

sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  const nickname = nick || socket.id.slice(0, 16);
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
});

saveButton.addEventListener('click', (e) => {
  e.preventDefault();
    nick = inputNickname.value;
    socket.emit('newNickname', nick);
    inputNickname.value = '';
});

const newMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('p');
  li.setAttribute(DATA_TESTID, 'message');
  li.setAttribute(CLASS, 'fs-6 fw-lighter color rounded');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (chatMessage) => newMessage(chatMessage));

const onlineUsers = (user) => {
  const userUl = document.querySelector('#userList');
  const li = document.createElement('p');
  li.setAttribute(DATA_TESTID, 'online-user');
  li.setAttribute(CLASS, 'fs-6 fw-lighter');
  li.setAttribute(ID, user);
  li.innerText = user;
  userUl.appendChild(li);
  return li;
};

socket.on('userList', (users) => {
  const userUl = document.querySelector('#userList');
  const usersQty = userUl.childElementCount;
  if (usersQty > 0) {
    while (userUl.firstChild) {
      userUl.removeChild(userUl.lastChild);
    }
  }
  if (!nick) nick = users[users.length - 1];
  userUl.appendChild(onlineUsers(nick));
  const newUsers = users.filter((user) => user !== nick);
  newUsers.forEach((user) => onlineUsers(user));
});

socket.on('showHistory', (history) => {
  history.forEach((msg) => {
    const messages = `${msg.timestamp} ${msg.nickname} diz: ${msg.chatMessage}`;
    newMessage(messages);
  });
});

window.onbeforeunload = () => {
  socket.disconnect();
};