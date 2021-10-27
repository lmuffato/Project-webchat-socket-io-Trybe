const socket = window.io('http://localhost:3000');

const btnMessage = document.querySelector('#btn-send');
const btnSave = document.querySelector('#btn-nick');
const inputMessage = document.querySelector('#msg-input');
const inputNick = document.querySelector('#nick-input');

btnMessage.addEventListener('click', (e) => {
  e.preventDefault();
  let name = '';
  if (inputNick.value === '') {
    name = socket.id.substring(0, 16);
    socket.emit('message', { chatMessage: inputMessage.value, nickname: name });
    inputMessage.value = '';
    return false;
  }
  name = inputNick.value;
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
  const listUsers = document.querySelector('.list-users');
  li.innerText = user;
  listUsers.appendChild(li);
};

socket.on('show_Users', (users) => {
  const listUsers = document.querySelector('.list-users');
  listUsers.innerHTML = '';
  users.forEach((user) => createUsers(user));
});

btnSave.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(inputNick.value);
  const nickname = inputNick.value;
  socket.emit('saveName', nickname);
  return false;
});
