const socket = window.io();

const sendBtn = document.querySelector('#send-button');
const nicknameBtn = document.querySelector('#nickname-button');
let nick;

socket.on('connect', () => {
  nick = socket.id;
});

sendBtn.addEventListener('click', () => {
  const input = document.querySelector('#message-input');
  socket.emit('message', { chatMessage: input.value, nickname: nick });
  input.value = '';
  return false;
});

nicknameBtn.addEventListener('click', () => {
  const input = document.querySelector('#nickname-input');
  socket.emit('nickname', { nickname: input.value, id: socket.id });
  input.value = '';
  return false;
});
const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

socket.on('nickname', ({ id, nickname }) => {
  const updateNickname = document.querySelector(`#${id}`);
  updateNickname.innerText = nickname;
  nick = nickname;
});

socket.on('user', (id) => {
  const users = document.querySelector('#online-users');
  const li = document.createElement('li');
  li.innerText = id;
  li.setAttribute('data-testid', 'online-user');
  li.setAttribute('id', id);
  users.appendChild(li);
});