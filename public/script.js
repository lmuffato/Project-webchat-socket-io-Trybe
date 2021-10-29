const client = window.io();

const button = document.querySelector('#button-teste');
const nickButton = document.querySelector('#nickButton');
const users = document.querySelector('#users');
const ul = document.querySelector('#listMessages');
const author = document.querySelector('#username');
const message = document.querySelector('#message-teste');

// Referencia ORLANDO FLORES
const saveNickname = () => {
  if (author) {
    sessionStorage.setItem('nickname', author.value);
  }
  author.innerText = '';
};

const getNick = () => {
  const nickname = sessionStorage.getItem('nickname');
  return nickname;
};

const createMessage = (msg) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = msg;
  console.log(ul);
  ul.appendChild(li);
};

const newUsers = (id) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = id;
  users.appendChild(li);
};

button.addEventListener('click', () => {
  const nickname = getNick() || client.id.substring(0, 16);
  const newMsg = {
    chatMessage: message.value,
    nickname,
  };
  client.emit('message', newMsg);
});

nickButton.addEventListener('click', saveNickname);

client.on('message', (msg) => createMessage(msg));
client.on('newUser', (allUsers) => {
  users.innerText = '';
  allUsers.forEach((id) => newUsers(id));
});

// Até aqui