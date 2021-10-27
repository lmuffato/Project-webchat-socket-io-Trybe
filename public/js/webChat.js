const socket = window.io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const nickButton = document.getElementById('nickBtn');
const nickInput = document.getElementById('nickInput');

let nickname = '';

const checkSpanUser = () => document.getElementById('user-span');
const removeSpanUser = () => document.getElementById('user-span').remove();

const addOnlineUser = (nick) => {
  if (checkSpanUser()) removeSpanUser();

  const spanUser = document.getElementById('user');
  const newSpanElement = document.createElement('span');
  newSpanElement.id = 'user-span';
  newSpanElement.setAttribute('data-testid', 'online-user');
  newSpanElement.textContent = nick;
  spanUser.appendChild(newSpanElement);
};

const firstUser = (user) => {
  if (checkSpanUser()) return null;
  addOnlineUser(user);
};

nickButton.addEventListener('click', () => {
  nickname = nickInput.value;
  addOnlineUser(nickname);
  nickInput.value = '';
});

const addMessage = (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  li.setAttribute('data-testid', 'message');
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('message', { chatMessage: input.value, nickname });
    input.value = '';
  }
});

socket.on('message', addMessage);
socket.on('connected', firstUser);