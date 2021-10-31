const socket = window.io();

const msgInput = document.getElementById('messageInput');
const msgBtn = document.getElementById('btnSendMessage');
const nicknameInput = document.getElementById('nicknameInput');
const nicknameBtn = document.getElementById('btnSaveNickname');

const dataTesteId = 'data-testid';

let nick = '';

msgBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const nickname = nick || socket.id.slice(0, 16);
  socket.emit('message', { chatMessage: msgInput.value, nickname });
  msgInput.value = '';
});

const sentMsg = (message) => {
  const chatMsgUl = document.getElementById('messagesList');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute(dataTesteId, 'message');
  chatMsgUl.appendChild(li);
};

nicknameBtn.addEventListener('click', (event) => {
  event.preventDefault();
  nick = nicknameInput.value;
  if (nick !== '') {
    socket.emit('newNickname', nick);
    nicknameInput.value = '';
  }
});

const nicknameList = (users) => {
  const firstUserName = socket.id.slice(0, 16);
  const nicknameUlList = document.getElementById('nicknameList');
  nicknameUlList.innerHTML = '';
  users.forEach((element) => {
  const li = document.createElement('li');
  li.setAttribute(dataTesteId, 'online-user');
  li.innerText = element;
    if (element === nick || element === firstUserName) {
      return nicknameUlList.prepend(li);
    }
    nicknameUlList.appendChild(li);
  });
};

socket.on('message', (chatMessage) => sentMsg(chatMessage));
socket.on('usersList', (users) => nicknameList(users));
socket.on('usersOnline', (users) => nicknameList(users));