const socket = window.io('http://localhost:3000');

const usersList = document.getElementById('online-users');
const sendBtn = document.getElementById('send-button');
const nicknameBtn = document.getElementById('nickname-button');
let nick = '';

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const nickname = nick || socket.id.substring(0, 16);
  const text = document.getElementById('input-message');
  socket.emit('message', { nickname, chatMessage: text.value });
  text.value = '';
  return false;
});

const createMessage = (message) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  const liText = document.createTextNode(message);
  li.append(liText);
  document.getElementById('board-message').appendChild(li);
};
socket.on('message', (message) => createMessage(message));

const setUserList = (user) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  const liNick = document.createTextNode(user);
  li.append(liNick);
  usersList.appendChild(li);
  return li;
};

nicknameBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const nicknameInput = document.getElementById('input-nickname');
  nick = nicknameInput.value;
  socket.emit('nickname', nick);
  nicknameInput.value = '';
  return false;
});

const createUsersList = (data) => {
  usersList.innerHTML = '';
  if (!nick) nick = data[data.length - 1];
  usersList.appendChild(setUserList(nick));
  const users = data.filter((user) => user !== nick);
  users.forEach((user) => setUserList(user));
};
socket.on('onlineUsers', (data) => createUsersList(data));