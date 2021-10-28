const socket = window.io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const nickButton = document.getElementById('nickBtn');
const nickInput = document.getElementById('nickInput');

const checkSpanUser = () => document.getElementById('user-span');
const removeSpanUser = () => document.getElementById('user-span').remove();

const addOnlineUser = (nick) => {
  if (checkSpanUser()) removeSpanUser();

  const spanUser = document.getElementById('user');
  const newSpanElement = document.createElement('span');
  newSpanElement.id = 'user-span';
  newSpanElement.setAttribute('data-testid', 'online-user');
  newSpanElement.textContent = nick;
  spanUser.appendChild(newSpanElement);
};

const addListUser = (user) => {
  const ul = document.getElementById('online-users');
  const li = document.createElement('li');
  li.className = 'userList';
  li.id = user;
  li.textContent = user;
  ul.appendChild(li);
};

const addUser = (user) => {
  document.getElementById('online-users').innerHTML = '';
  user.forEach((item) => addListUser(item));

  if (checkSpanUser()) return null;
  addOnlineUser(user[user.length - 1]);
};

const replaceNick = (nick) => {
  const arrayUsers = document.querySelectorAll('.userList');
  const newArrayUsers = [];
  arrayUsers.forEach((item) => newArrayUsers.push(item.textContent));

  const currentNick = document.getElementById('user-span').textContent;
  
  newArrayUsers.forEach((item, i) => {
    if (item === currentNick) newArrayUsers.splice(i, 1, nick);
  });

  arrayUsers.forEach((item) => item.remove());

  newArrayUsers.forEach((item) => addListUser(item));
};

nickButton.addEventListener('click', () => {
  replaceNick(nickInput.value);
  addOnlineUser(nickInput.value);
  nickInput.value = '';
});

const addMessage = (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  li.setAttribute('data-testid', 'message');
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    const user = document.getElementById('user-span').textContent;
    socket.emit('message', { chatMessage: input.value, user });
    input.value = '';
  }
});

const removeItem = (userList) => {
  const e = document.querySelector('.userList:last-child');
  e.parentElement.removeChild(e);
  console.log(userList);
};

socket.on('message', addMessage);
socket.on('connected', addUser);
socket.on('userList', removeItem);