const socket = window.io();

const button = document.querySelector('#sendMsgButton');
const nickButton = document.querySelector('#sendNickButton');
const input = document.querySelector('#inputMsg');
const nickInput = document.querySelector('#inputNickname');
const messages = document.querySelector('#messageList');
const clientsList = document.querySelector('#clientsList');

let currentNickname;

socket.on('connect', () => {
  currentNickname = socket.id;
});

// Consultei o PR #69 do Iago para auxílio no script.js
button.addEventListener('click', () => {
  socket.emit('message', { chatMessage: input.value, nickname: currentNickname });
  input.value = '';
  return false;
});

const createMessage = (message) => {
  const li = document.createElement('li');
  li.dataset.testid = 'message';
  li.innerText = message;
  messages.appendChild(li);
};

const createUser = (id) => {
  const li = document.createElement('li');
  li.innerText = id;
  li.setAttribute('data-testid', 'online-user');
  li.setAttribute('id', id);
  clientsList.appendChild(li);
};

const changeNickname = (nickname, id) => {
  const nickName = document.querySelector(`#${id}`);
  nickName.innerText = nickname;
  currentNickname = nickname;
};

nickButton.addEventListener('click', () => {
  socket.emit('nickname', { nickname: nickInput.value, id: socket.id });
  nickInput.value = '';
  return false;
});

socket.on('message', (message) => createMessage(message));

socket.on('nickname', ({ nickname, id }) => changeNickname(nickname, id));

socket.on('user', (id) => createUser(id));
