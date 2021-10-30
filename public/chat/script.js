const socket = window.io();

const msgInput = document.querySelector('.mensagem__input');
const msgBtn = document.querySelector('.mensagem__btn');

const nicknameInput = document.querySelector('.nickname__input');
const nicknameBtn = document.querySelector('.nickname__btn');

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
  li.setAttribute('data-testid', 'message');
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
  const nicknameUlList = document.querySelector('.nickname__list');
  nicknameUlList.innerHTML = '';
  users.forEach((element) => {
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'online-user');
    li.innerText = element;
    nicknameUlList.appendChild(li);
  });
};

socket.on('message', (chatMessage) => sentMsg(chatMessage));

socket.on('usersList', (users) => nicknameList(users));
