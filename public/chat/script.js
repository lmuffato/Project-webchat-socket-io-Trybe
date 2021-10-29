const socket = window.io();

const msgBtn = document.querySelector('.mensagem__btn');
const msgInput = document.querySelector('.mensagem__input');

msgBtn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(socket.id, 'soooooockeeet id');
  // console.log(socket.id.slice(1, 17), '177777777777');
  socket.emit('message', { chatMessage: msgInput.value, nickname: socket.id.slice(1, 17) });
  msgInput.value = '';
});

const sentMsg = (message) => {
  const chatMsgUl = document.querySelector('.webchat__mensagens');
  const li = document.createElement('li');
  li.innerText = message;
  chatMsgUl.appendChild(li);
};

socket.on('message', (chatMessage) => sentMsg(chatMessage));