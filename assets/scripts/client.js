const socket = window.io('http://localhost:3000');

const btnMessage = document.querySelector('#btn-send');
const btnSave = document.querySelector('#btn-nick');
const inputMessage = document.querySelector('#msg-input');
const inputNick = document.querySelector('#nick-input');
const listUsers = document.querySelector('.list-users');
let nick = '';

btnMessage.addEventListener('click', (e) => {
  e.preventDefault();
  const name = nick || socket.id.substring(0, 16);
  console.log(name);
  socket.emit('message', { chatMessage: inputMessage.value, nickname: name });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  const messagesUl = document.querySelector('.messages');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

const createUsers = (user) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  // const listUsers = document.querySelector('.list-users');
  li.innerText = user;
  listUsers.appendChild(li);
  return li;
};

btnSave.addEventListener('click', (e) => {
  e.preventDefault();
  nick = inputNick.value;
  socket.emit('saveName', nick);
  return false;
});

socket.on('show_Users', (data) => {
  listUsers.innerHTML = '';

  if (!nick) nick = data[data.length - 1];
  listUsers.appendChild(createUsers(nick));
  const users = data.filter((user) => user !== nick);
  users.forEach((user) => createUsers(user));
});

module.export = { nick };