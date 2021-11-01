const socket = window.io();

const inputMessage = document.querySelector('#message-box');
const inputNick = document.querySelector('#nickname-box');
const buttonNick = document.querySelector('#nickname-button');
const buttonSend = document.querySelector('#send-button');
const ulUsers = document.querySelector('#online-users');
const ulMessage = document.querySelector('#messages');
const dataTestId = 'data-testid';
let nickname = null;

buttonNick.addEventListener('click', () => {
  if (!inputNick.value) return;
  socket.emit('changeNick', inputNick.value);
  nickname = inputNick.value;
  inputNick.value = '';
});

buttonSend.addEventListener('click', () => {
  if (!inputMessage.value) return;
  socket.emit('message', { nickname, chatMessage: inputMessage.value });
  inputMessage.value = '';
});

socket.on('changeNick', (newNick) => {
  nickname = newNick;
});

/**
 * Source: https://github.com/tryber/sd-09-project-webchat/tree/regoraphael-project-webchat
 */
socket.on('message', (data) => {
  const li = document.createElement('li');
  li.innerText = data;
  li.setAttribute(dataTestId, 'message'); 
  ulMessage.appendChild(li);
});

/**
 * Source: https://github.com/tryber/sd-09-project-webchat/tree/regoraphael-project-webchat
 */
socket.on('allUsers', (users) => {
  ulUsers.innerHTML = '';
  const userLi = document.createElement('li');
  userLi.innerText = nickname;
  userLi.setAttribute(dataTestId, 'online-user'); 
  ulUsers.appendChild(userLi);

  const filter = users.filter((f) => f !== nickname);
  filter.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user;
    li.setAttribute(dataTestId, 'online-user'); 
    ulUsers.appendChild(li);
  });
});

/**
 * Source: https://github.com/tryber/sd-09-project-webchat/tree/regoraphael-project-webchat
 */
socket.on('database', (mongo) => {
  mongo.forEach((messageDB) => {
    const li = document.createElement('li');
    li.innerText = messageDB.message;
    li.setAttribute(dataTestId, 'message'); 
    ulMessage.appendChild(li);
  });
});