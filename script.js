const socket = windows.io();

const form = document.querySelector('form');
const chatText = document.getElementById('text-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('message-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('message-sent', chatText.value);
  chatText.value = '';
  return false;
});