const socket = window.io();

const inputMessage = document.querySelector('#input-message');
const nicknameForm = document.querySelector('#nickname-form');
const nicknameInput = document.querySelector('#nickname-input');

// let nickname;

const insertNewNickname = (value) => {
  // nickname = value;
  const nicknameSpan = document.querySelector('#nickname');
  nicknameSpan.innerHTML = value;
  nicknameInput.value = '';
};

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = nicknameInput.value;
  socket.auth = { nickname };
  socket.emit('changeNick', nickname);
});

const createMessage = (message) => {
  const messagesList = document.querySelector('#chat-messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerHTML = message;
  messagesList.appendChild(li);
};

function submitForm() {
  socket.emit('message', { chatMessage: inputMessage.value });
  inputMessage.value = '';
  return false;
}

inputMessage.addEventListener('keydown', (e) => {
  if (e.which === 13) {
    e.preventDefault();
    submitForm();
  }
});

socket.on('message', (message) => createMessage(message));
socket.on('serverMessage', ({ message }) => createMessage(message));
socket.on('changeNick', (nick) => insertNewNickname(nick));
socket.on('connection', (nick) => insertNewNickname(nick));
