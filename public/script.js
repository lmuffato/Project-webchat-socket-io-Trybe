const client = window.io();

const button = document.querySelector('.buttonMessage');
const nickButton = document.querySelector('.nickButton');
const users = document.querySelector('.users');
const ul = document.querySelector('#listMessages');
const author = document.querySelector('#username');
const message = document.querySelector('#messageInput');

// Referencia ORLANDO FLORES
const saveNickname = () => {
  if (author.value) {
    sessionStorage.setItem('nickname', author.value);
  }
};

const getNick = () => {
  const nickname = sessionStorage.getItem('nickname');
  return nickname;
};

const newUsers = (id) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = id;
  users.appendChild(li);
  return li;
};

const createMessage = (msg) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.setAttribute('class', 'messageLi');
  li.innerText = msg;
  ul.appendChild(li);
};

nickButton.addEventListener('click', (e) => {
  e.preventDefault();
  saveNickname();
  if (author.value) {
    client.emit('nickname', author.value);
  }
  author.value = '';
});

button.addEventListener('click', (e) => {
  e.preventDefault();
  const nickname = getNick() || client.id.substring(0, 16);
  const newMsg = {
    chatMessage: message.value,
    nickname,
  };
  message.value = '';
  client.emit('message', newMsg);
});

let socketID = '';

client.on('message', (msg) => createMessage(msg));

client.on('sendSocketID', (id) => {
  socketID = id;
});

client.on('newUser', (allUsers) => {
  users.innerText = '';
  const filterUsers = [allUsers[socketID], ...Object.entries(allUsers)
    .filter((u) => u[0] !== socketID).map((u) => u[1])];
  filterUsers.forEach((user) => users.appendChild(newUsers(user)));
});

client.on('getMessages', (messages) => {
  messages.forEach(({ timeStamp, nickname, chatMessage }) =>
  createMessage(`${timeStamp} - ${nickname}: ${chatMessage}`));
});

// Até aqui