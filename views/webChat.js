const socket = window.io();

const typeAndSubmitField = document.getElementById('chat');
const typeField = document.getElementById('input');
const messagesField = document.getElementById('messages');
const nickBtn = document.getElementById('nickBtn');

const spanUser = () => document.getElementById('userSpan');
const deleteSpanUser = () => document.getElementById('userSpan').remove();

const addOnline = (nick) => {
  if (spanUser()) deleteSpanUser();

  const user = document.getElementById('userName');
  const newUserElement = document.createElement('span');
  newUserElement.id = 'userSpan';
  newUserElement.setAttribute('data-test-id', 'online-user');
  newUserElement.textContent = nick;
  user.appendChild(newUserElement);
};

const firstUser = (user) => {
  if (spanUser()) return null;
  addOnline(user);
};

let nickname = '';

nickBtn.addEventListener('click', () => {
  const nickInput = document.getElementById('nickInput');
  nickname = nickInput.value;
  addOnline(nickname);
  nickInput.value = '';
});

const addMessage = (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  li.setAttribute('data-testid', 'message');
  messagesField.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
};

typeAndSubmitField.addEventListener('click', (e) => {
  e.preventDefault();
  if (typeField.value) {
    socket.emit('message', { chatMessage: typeField.value, nickname });
  }
  typeField.value = '';
});

socket.on('message', addMessage);
socket.on('connected', firstUser);