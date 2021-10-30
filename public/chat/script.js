const socket = window.io();

const msgInput = document.querySelector('.mensagem__input');
const msgBtn = document.querySelector('.mensagem__btn');

const nicknameInput = document.querySelector('.nickname__input');
const nicknameBtn = document.querySelector('.nickname__btn');

const dataTesteId = 'data-testid';
// Ideia de Marília turma 10 A
let nick = '';

msgBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const nickname = nick || socket.id.slice(0, 16);
  socket.emit('message', { chatMessage: msgInput.value, nickname });
  msgInput.value = '';
});

const sentMsg = (message) => {
  const chatMsgUl = document.querySelector('.webchat__mensagens');
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
  const fisrtUserName = socket.id.slice(0, 16);
  const nicknameUlList = document.querySelector('.nickname__list');
  nicknameUlList.innerHTML = '';
  users.forEach((element) => {
  const li = document.createElement('li');
  li.setAttribute(dataTesteId, 'online-user');
  li.innerText = element;
    if (element === nick || element === fisrtUserName) {
      return nicknameUlList.prepend(li);
    }
    nicknameUlList.appendChild(li);
  });
};

const renderMsgFromDB = (msgFromDb) => {
  console.log(msgFromDb, 'dentro da funcao');
    msgFromDb.forEach(({ timestamp, nickname, chatMessage }) => {
    const chatMsgUl = document.querySelector('.webchat__mensagens');
    const li = document.createElement('li');
    li.innerText = `${timestamp} - ${nickname} : ${chatMessage}`;
    li.setAttribute(dataTesteId, 'message');
    chatMsgUl.appendChild(li);
  });
};

socket.on('historyMsg', (msgFromDb) => renderMsgFromDB(msgFromDb));

socket.on('message', (chatMessage) => sentMsg(chatMessage));

socket.on('usersList', (users) => nicknameList(users));

socket.on('usersOnline', (users) => nicknameList(users));
