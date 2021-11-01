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

socket.on('showUsers', (users) => {
  listUsers.innerText = '';
  users.forEach((user) => createUser(user));
});

window.onbeforeunload = () => {
  socket.disconnect();
};