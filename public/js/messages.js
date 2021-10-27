const socket = window.io();
    
const messagesUl = document.getElementById('messages-list');
const form = document.getElementById('message-form');
const nicknameForm = document.getElementById('change-nick-form');
const nicknameSpan = document.getElementById('nickname');

const appendMessages = (message) => {
  const newLi = document.createElement('li');
  newLi.setAttribute('data-testid', 'message');
  newLi.textContent = message;

  messagesUl.appendChild(newLi);
};

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();  
  const newNickname = document.getElementById('nick-input').value;

  sessionStorage.setItem('nickname', newNickname);
  nicknameSpan.innerText = newNickname;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const msgInput = document.getElementById('message-input');

  socket.emit('message', {
    chatMessage: msgInput.value,
    nickname: sessionStorage.getItem('nickname') || nicknameSpan.innerText,
  });

  msgInput.value = '';
});

socket.on('message', appendMessages);

window.onload = () => {
};
