const socket = window.io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const nickButton = document.getElementById('nickBtn');
const nickInput = document.getElementById('nickInput');

let nickname = 'Dom Juan';

nickButton.addEventListener('click', () => {
  nickname = nickInput.value;
  nickInput.value = '';
});

const addMessage = (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
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