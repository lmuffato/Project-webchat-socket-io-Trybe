const socket = window.io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const nickButton = document.getElementById('nickBtn');
const nickInput = document.getElementById('nickInput');

/* const replaceNick = (nick) => {
  const arrayUsers = document.querySelectorAll('.userList');
  const newArrayUsers = [];
  arrayUsers.forEach((item) => newArrayUsers.push(item.textContent));

  const currentNick = document.getElementById('user-span').textContent;
  
  newArrayUsers.forEach((item, i) => {
    if (item === currentNick) newArrayUsers.splice(i, 1, nick);
  });

  arrayUsers.forEach((item) => item.remove());

  newArrayUsers.forEach((item) => addListUser(item));
}; */

/* nickButton.addEventListener('click', () => {
  replaceNick(nickInput.value);
  addOnlineUser(nickInput.value);
  nickInput.value = '';
}); */

/* const addMessage = (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  li.setAttribute('data-testid', 'message');
  messages.appendChild(li);
}; */

/* form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    const user = document.getElementById('user-span');
    socket.emit('message', { chatMessage: input.value, user });
    input.value = '';
  }
});

const removeItem = () => {
  const e = document.querySelector('.userList:last-child');
  e.parentElement.removeChild(e);
}; */

/* const checkSpanUser = () => document.getElementById('user-span');
const removeSpanUser = () => document.getElementById('user-span').remove();

const addOnlineUser = (nick) => {
  console.log(nick);
  if (checkSpanUser()) removeSpanUser();

  const spanUser = document.getElementById('user');
  const newSpanElement = document.createElement('span');
  newSpanElement.id = 'user-span';
  newSpanElement.setAttribute('data-testid', 'online-user');
  newSpanElement.textContent = nick;
  spanUser.appendChild(newSpanElement);
  return null;
};

const addListUser = (user) => {
  console.log(user);
  const ul = document.getElementById('online-users');
  const li = document.createElement('li');
  li.className = 'userList';
  li.id = user;
  li.textContent = user;
  ul.appendChild(li);
  return null;
};

const addUser = (user) => {
  user.forEach((item) => addListUser(item));

  if (checkSpanUser()) return null;
  addOnlineUser(user[user.length - 1]);
}; */

const checkSpanUser = () => document.getElementById('user-span');
const removeSpanUser = () => document.getElementById('user-span').remove();

const generateSpanUser = (user) => {
  const spanUser = document.getElementById('user');
  const newSpanElement = document.createElement('span');
  newSpanElement.id = 'user-span';
  newSpanElement.setAttribute('data-testid', 'online-user');
  newSpanElement.textContent = user;
  spanUser.appendChild(newSpanElement);
};

const addNewUser = (nick) => {
  if (checkSpanUser()) return;
  sessionStorage.setItem('nickname', nick);
  generateSpanUser(nick);
};

nickButton.addEventListener('click', () => {
  removeSpanUser();
  addNewUser(nickInput.value);
  nickInput.value = '';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = sessionStorage.getItem('nickname');
  if (input.value) {
    socket.emit('message', { chatMessage: input.value, nickname: user });
    input.value = '';
  }
});

const sendMessage = (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  li.setAttribute('data-testid', 'message');
  messages.appendChild(li);
};

socket.on('addNewUser', addNewUser);
socket.on('message', sendMessage);

/* socket.on('message', addMessage);
socket.on('userList', removeItem) */