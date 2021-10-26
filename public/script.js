const client = window.io();

const inputNick = document.querySelector('#nickname');
const btnNickName = document.querySelector('#nickname-button');
const listUsers = document.querySelector('#content-list');
const listMessages = document.querySelector('#content-messages');
const inputMessage = document.querySelector('#message');
const btnSend = document.querySelector('#send-button');

const createListUsers = (user) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerHTML = user;
  return li;
};

const createListMessage = (message) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerHTML = message;
  return li;
};

let nickname = '';

btnSend.addEventListener('click', (ev) => {
  ev.preventDefault();
  if (inputMessage.value) {
    const nick = nickname || client.id.substring(0, 16);
    client.emit('message', { chatMessage: inputMessage.value, nickname: nick });
    inputMessage.value = '';
  }
});

btnNickName.addEventListener('click', (ev) => {
  ev.preventDefault();
  if (inputNick.value) {
    nickname = inputNick.value;
    client.emit('nickname', nickname);
    inputNick.value = '';
  }
});

client.on('message', (data) => {
  listMessages.append(createListMessage(data));
});

client.on('allUsers', (data) => {
  listUsers.innerHTML = '';
  if (!nickname) nickname = data[data.length - 1];
  listUsers.appendChild(createListUsers(nickname));
  const users = data.filter((user) => user !== nickname);
  users.forEach((user) => listUsers.appendChild(createListUsers(user)));
});

client.on('allMessages', (data) => {
  data.forEach((dataMessage) => {
    const { message, nickname: nick, timestamp } = dataMessage;
    const formattedMsg = `${timestamp} - ${nick}: ${message}`;
    listMessages.appendChild(createListMessage(formattedMsg));
  });
});
