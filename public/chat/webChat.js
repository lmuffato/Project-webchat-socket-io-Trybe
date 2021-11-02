const socket = window.io();

const msgInput = document.querySelector('.msg__input');
const sendMsg = document.querySelector('.send__btn');
const dataTestId = 'data-testid';
const nickName = document.querySelector('.nick__name');
const nickBtn = document.querySelector('.nick__btn');
const nickBox = document.querySelector('nick__box');
let NICK = '';

const listMsg = (msg) => {
  const chatMsgUl = document.querySelector('.msg__list');
  const createList = document.createElement('li');
  createList.innerText = msg;
  createList.setAttribute(dataTestId, 'message');
  chatMsgUl.appendChild(createList);
};

sendMsg.addEventListener('click', (event) => {
  event.preventDefault();
  const nickname = NICK || socket.id.slice(1, 17);
  socket.emit('message', { chatMessage: msgInput.value, nickname });
  msgInput.value = '';
});

// captura o valor do input do nickname

nickBtn.addEventListener('click', (event) => {
  event.preventDefault();
  NICK = nickName.value;
  console.log(NICK);
  socket.emit('newUser', NICK);
  nickName.value = '';
});

const usersList = (users) => {
  console.log(users);
  nickBox.innerHTML = '';
  users.forEach((user) => { 
    const list = document.createElement('li');
    list.setAttribute(dataTestId, 'online-user');
    list.innerText = user;
    nickBox.appendChild(list);
  });
};

socket.on('allUsers', (users) => usersList(users));

socket.on('message', (chatMessage) => listMsg(chatMessage));

// window.io - serve para chamar o io dentro do script
// os arquivos públicos servem para que todos os clients tenham acesso ao chat
// preventDefault - a ideia aqui é chamar a função assim q a página for carregada, sem a chamar de fato