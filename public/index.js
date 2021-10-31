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
  if (!newListUsers) {
    newListUsers = randomUser.pop();
  }
  createRandomUser(newListUsers);
  randomUser.filter((user) => user !== newListUsers)
    .forEach((user) => createRandomUser(user));
});

// para resolução dos requisitos envolvendo os usuarios 
// foi realizada consulta no PR da colega Ana Ventura
// https://github.com/tryber/sd-010-a-project-webchat/blob/anaventura1811-webchat-project/public/js/chat.js