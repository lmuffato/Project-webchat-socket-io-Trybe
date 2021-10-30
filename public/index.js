const socket = window.io();
const form = document.querySelector('form');
const inputMessage = document.querySelector('#message-input');
const buttonChangeNickName = document.querySelector('#nick-name_button');
const userList = document.querySelector('#users-list');
let newListUsers = '';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  const nickname = newListUsers;
  socket.emit('message', { nickname, chatMessage });
  inputMessage.value = '';
  return false;
});

const createChatMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const createRandomUser = (randomUser) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.classList = 'list-users';
  li.innerText = randomUser;
  userList.appendChild(li);
};

buttonChangeNickName.addEventListener('click', () => {
  const inputNickName = document.querySelector('#nick-name');
  if (inputNickName.value) {
    newListUsers = inputNickName.value;
    inputNickName.value = '';
    socket.emit('newUserList', newListUsers);
  }
});

socket.on('message', (message) => {
  createChatMessage(message);
});
socket.on('randomNickname', (randomUser) => {
  userList.textContent = '';
  createRandomUser(randomUser);

  if (!newListUsers) {
    newListUsers = randomUser[randomUser.length - 1];
  }
  createRandomUser(newListUsers);
  const listUsers = randomUser.filter((user) => user !== newListUsers);
  listUsers.forEach((user) => createRandomUser(user));
});
