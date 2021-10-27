const socket = window.io();
    
const form = document.getElementById('message-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const msgInput = document.getElementById('message-input');

  socket.emit('message', {
    chatMessage: msgInput.value,
    nickname: 'abc',
  });
});

socket.on('message', (message) => {
  console.log(`${message}`);
});