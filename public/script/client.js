const socket = window.io();

const sendButton = document.querySelector('#sendButton');
const inputMessage = document.querySelector('#messageBox');
const saveButton = document.querySelector('#nicknameButton');
const inputNickname = document.querySelector('#nicknameBox');

const DATA_TESTID = 'data-testid';
const ID = 'id';
const TITLE = 'title';

sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  const nick = document.getElementById(socket.id.slice(0, 16)).title;
  socket.emit('message', { chatMessage: inputMessage.value, nickname: nick });
  inputMessage.value = '';
});

saveButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (inputNickname.value) {
    const newNickname = inputNickname.value;
    const greeting = document.querySelector('#greeting').firstChild;
    greeting.innerText = `Olá, ${newNickname}!`;
    greeting.setAttribute(TITLE, newNickname);
    inputNickname.value = '';
    socket.emit('newNickname', newNickname);
  }
});

const userGreeting = (userName) => {
  const userSpan = document.querySelector('#greeting');
  const p = document.createElement('p');
  p.setAttribute(ID, userName);
  p.innerText = `Olá, ${userName}!`;
  userSpan.appendChild(p);
};

const newMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute(DATA_TESTID, 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (chatMessage) => newMessage(chatMessage));

const onlineUsers = (users) => {
  const userUl = document.querySelector('#userList');
  const li = document.createElement('li');
  li.setAttribute(DATA_TESTID, 'online-user');
  li.setAttribute(ID, users);
  li.innerText = users;
  userUl.appendChild(li);
};

socket.on('userList', (users) => {
  const userUl = document.querySelector('#userList');
  const usersQty = userUl.childElementCount;
  if (usersQty > 0) {
    while (userUl.firstChild) {
      userUl.removeChild(userUl.lastChild);
    }
  }
  users.forEach((user) => onlineUsers(user)); 
});
socket.on('userName', (userName) => userGreeting(userName));

socket.on('showHistory', (history) => {
  history.forEach((msg) => {
    const messages = `${msg.timestamp} ${msg.nickname} diz: ${msg.chatMessage}`;
    newMessage(messages);
  });
});