const socket = window.io();

const nickInput = document.getElementById('nickInput');
const nickBtn = document.getElementById('nickBtn');
const messageInput = document.getElementById('messageInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const listMessages = document.getElementById('messagesField');
const listUsers = document.getElementById('userList');

const saveNickname = () => {
  if (nickInput.value) {
    sessionStorage.setItem('nickname', nickInput.value);
  }
};

const getNickname = () => {
  const nickname = sessionStorage.getItem('nickname');
  return nickname;
};

const createUser = (id) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = id;
  listUsers.appendChild(li);
  return li;
};

const createMessage = (message) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  listMessages.appendChild(li);
};

nickBtn.addEventListener('click', () => {
  saveNickname();
  if (nickInput.value) {
    socket.emit('nickname', nickInput.value);
  }
  nickInput.value = '';
});

sendMessageBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const nickname = getNickname() || socket.id.substring(0, 16);
  if (messageInput.value) {
    socket.emit('message', { chatMessage: messageInput.value, nickname });
  }
  messageInput.value = '';
});

socket.on('message', (message) => createMessage(message));

socket.on('getMessages', (messages) => {
  messages.forEach(({ timeStamp, nickname, chatMessage }) =>
    createMessage(`${timeStamp} - ${nickname}: ${chatMessage}`));
});

let socketId = '';

socket.on('sendSocketID', (id) => {
  socketId = id;
});

socket.on('showUsers', (users) => {
  listUsers.innerHTML = '';
  /* if (!nick) nick = users[socketId]; */
  const allUsers = [users[socketId], ...Object.entries(users)
    .filter((u) => u[0] !== socketId).map((u) => u[1])];
  console.log(allUsers);
  console.log(socketId);
  allUsers.forEach((user) => listUsers.appendChild(createUser(user)));
});

window.onbeforeunload = () => {
  socket.disconnect();
};