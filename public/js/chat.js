const socket = window.io();

const inputMessage = document.querySelector('#input-message');
const nicknameForm = document.querySelector('#nickname-form');
const nicknameInput = document.querySelector('#nickname-input');
const messageForm = document.querySelector('#chat-message-form');

let nickname;

const insertNewNickname = (nick) => {
  const nicknameSpan = document.querySelector('#nickname');
  nicknameSpan.innerHTML = nick;
  nicknameInput.value = '';
};

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  nickname = nicknameInput.value;
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

function submitForm(e) {
  e.preventDefault();
  if (inputMessage.value) {
    socket.emit('message', { chatMessage: inputMessage.value, nickname });
    inputMessage.value = '';
    return false;
  }
}

messageForm.addEventListener('submit', submitForm);

socket.on('message', (message) => createMessage(message));
socket.on('serverMessage', ({ message }) => createMessage(message));
socket.on('changeNick', (nick) => insertNewNickname(nick));
socket.on('connection', (nick) => insertNewNickname(nick));
