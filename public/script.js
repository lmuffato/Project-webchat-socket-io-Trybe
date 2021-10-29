/**
 * @type {import('socket.io-client').Socket}
 */
const socket = window.io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('ALO');
  if (input.value) {
    socket.emit('message', input.value);
    input.value = '';
  }
});

socket.on('message', (msg) => {
const li = document.createElement('li');
li.textContent = msg;
messages.append(li);
window.scrollTo(0, document.body.scrollHeight);
});
