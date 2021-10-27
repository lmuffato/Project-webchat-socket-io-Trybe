const socket = window.io();
    
const form = document.getElementById('message-form');
// const nicknameSpan = document.getElementById('nickname');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const msgInput = document.getElementById('message-input');

  socket.emit('message', {
    chatMessage: msgInput.value,
    nickname: 'abc',
  });

  msgInput.value = '';
});

socket.on('message', (message) => {
  console.log(`${message}`);
});

window.onload = () => {
};
