const socket = window.io();

const msgInput = document.querySelector('.msg__input');
const sendMsg = document.querySelector('.send__btn');
const chatMsgUl = document.querySelector('.msg__list');
const dataTestId = 'data-testid';
const nickName = document.querySelector('.nick__name');
const nickBtn = document.querySelector('.nick__btn');
const nickBox = document.querySelector('.nick__box');
let NICK = '';

const listMsg = (msg) => {
  const createList = document.createElement('li');
  createList.innerText = msg;
  createList.setAttribute(dataTestId, 'message');
  chatMsgUl.appendChild(createList);
};

sendMsg.addEventListener('click', (event) => {
  event.preventDefault();
  const nickname = NICK || socket.id.slice(0, 16);
  socket.emit('message', { chatMessage: msgInput.value, nickname });
  msgInput.value = '';
});

// captura o valor do input do nickname

nickBtn.addEventListener('click', (event) => {
  event.preventDefault();
  NICK = nickName.value;
  socket.emit('newUser', NICK);
  if (NICK !== '') {
    socket.emit('newUser', NICK);
    nickName.value = '';
  }
});

const usersList = (users) => {
  const firstNick = socket.id.slice(0, 16);
  nickBox.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.setAttribute(dataTestId, 'online-user');
    li.innerText = user;
    if (user === NICK || user === firstNick) {
      return nickBox.prepend(li);
    }
    nickBox.appendChild(li);
  });
};

const renderMessageDB = (mongo) => {
  mongo.forEach(({ timestamp, nickname, chatMessage }) => {
  const li = document.createElement('li');
  li.innerText = `${timestamp} - ${nickname} : ${chatMessage}`;
  li.setAttribute(dataTestId, 'message');
  chatMsgUl.appendChild(li);
});
};

socket.on('message', (chatMessage) => listMsg(chatMessage));
socket.on('allUsers', (users) => usersList(users));
socket.on('memoryMsg', (mongo) => renderMessageDB(mongo));
socket.on('nickon', (users) => usersList(users));

// window.io - serve para chamar o io dentro do script
// os arquivos públicos servem para que todos os clients tenham acesso ao chat
// preventDefault - a ideia aqui é chamar a função assim q a página for carregada, sem a chamar de fato