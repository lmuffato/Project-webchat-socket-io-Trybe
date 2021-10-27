const socket = window.io();
    
const messagesUl = document.getElementById('messages-list');
const form = document.getElementById('message-form');
const nicknameSpan = document.getElementById('nickname');

const appendMessages = (message) => {
  const newLi = document.createElement('li');
  newLi.setAttribute('data-testid', 'message');
  newLi.textContent = message;

  messagesUl.appendChild(newLi);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const msgInput = document.getElementById('message-input');

  socket.emit('message', {
    chatMessage: msgInput.value,
    nickname: nicknameSpan.innerText,
  });

  msgInput.value = '';
});

socket.on('message', appendMessages);

window.onload = () => {
};
