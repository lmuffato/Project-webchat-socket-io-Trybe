const socket = window.io();

const form = document.getElementById('form');
const inputMessage = document.getElementById('messageInput');
const inputNickname = document.getElementById('nicknameInput');
const nicknameChange = document.getElementById('changeNickname');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', 
  { chatMessage: inputMessage.value, nickname: socket.id.slice(0, 16) });
  inputMessage.value = '';
});

const createMessage = (message) => {
  const messagesUl = document.getElementById('messages');
  const li = document.createElement('li');
  li.innerHTML = message;
  li.setAttribute('data-testid', 'message'); // https://developer.mozilla.org/pt-BR/docs/Web/API/Element/setAttribute
  messagesUl.appendChild(li);
};

 nicknameChange.addEventListener('click', (e) => {
  e.preventDefault(); 
  const nick = { nickname: socket.id = inputNickname.value };
  inputNickname.value = '';
  return nick;
});

socket.on('message', (message) => createMessage(message));
socket.on('onlineUser', (id) => {
  const span = document.getElementById('socketId');
  span.innerHTML = id;
});
socket.on('history', (messageHist) => {
  console.log(messageHist);
});