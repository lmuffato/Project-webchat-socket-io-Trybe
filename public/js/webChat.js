const socket = window.io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const nickButton = document.getElementById('nickBtn');
const nickInput = document.getElementById('nickInput');

const checkSpanUser = () => document.getElementById('user-span');
const removeSpanUser = () => document.getElementById('user-span').remove();

const removeListUsers = () => {
  document.getElementById('online-users').innerHTML = '';
};

const generateSpanUser = (user) => {
  const spanUser = document.getElementById('user');
  const newSpanElement = document.createElement('span');
  newSpanElement.id = 'user-span';
  newSpanElement.dataset.testid = 'online-user';
  newSpanElement.textContent = user;
  spanUser.appendChild(newSpanElement);
};

const addNewUser = (nick) => {
  if (checkSpanUser()) return;
  sessionStorage.setItem('nickname', nick);
  generateSpanUser(nick);
};

nickButton.addEventListener('click', () => {
  const oldUser = sessionStorage.getItem('nickname');
  const newUser = nickInput.value;
  sessionStorage.setItem('nickname', newUser);
  removeSpanUser();
  addNewUser(newUser);
  socket.emit('replaceUser', { oldUser, newUser });
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

const generateList = (user) => {
  const ul = document.getElementById('online-users');
  const li = document.createElement('li');
  li.className = 'userList';
  li.setAttribute('data-testid', 'online-user');
  li.id = user;
  li.textContent = user;
  ul.appendChild(li);
};

const createListUsers = (listUser) => {
  removeListUsers();
  const mainUser = sessionStorage.getItem('nickname');
  generateList(mainUser);

  listUser.forEach(({ genericUser }) => {
    if (genericUser !== mainUser) generateList(genericUser);
  });
};

socket.on('addNewUser', addNewUser);
socket.on('message', sendMessage);
socket.on('refreshList', createListUsers);
