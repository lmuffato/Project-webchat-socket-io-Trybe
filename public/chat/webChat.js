const socket = window.io();

const msgInput = document.querySelector('.msg__input');
const sendMsg = document.querySelector('.send__btn');

const listMsg = (msg) => {
  const chatMsgUl = document.querySelector('.msg__list');
  const createList = document.createElement('li');
  createList.innerText = msg;
  chatMsgUl.appendChild(createList);
};

sendMsg.addEventListener('click', (event) => {
  event.preventDefault();
  socket.emit('message', { chatMessage: msgInput.value, nickname: socket.id.slice(1, 17) });
  msgInput.value = '';
});

socket.on('message', (chatMessage) => listMsg(chatMessage));

// window.io - serve para chamar o io dentro do script
// os arquivos públicos servem para que todos os clients tenham acesso ao chat
// preventDefault - a ideia aqui é chamar a função assim q a página for carregada, sem a chamar de fato