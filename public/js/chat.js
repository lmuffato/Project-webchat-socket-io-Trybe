const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
const inputNickname = document.querySelector('#userNickname');
const btnNickname = document.querySelector('#saveNickname');

const username = sessionStorage.getItem('nickname') === null 
  ? undefined : sessionStorage.getItem('nickname');
  
socket.emit('joinChat', { username });

const changeNickname = () => {  
  if (inputNickname.value === '') return false;

  sessionStorage.setItem('nickname', inputNickname.value);
  inputNickname.value = '';
};

btnNickname.addEventListener('click', async () => {
 await changeNickname();
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const activeUser = await sessionStorage.getItem('nickname') === null 
  ? undefined : sessionStorage.getItem('nickname');

  socket.emit('message', { chatMessage: inputMessage.value, nickname: activeUser });

  inputMessage.value = '';

  return false;
});

const createMessage = (message) => {
  const messageUl = document.querySelector('.messages');
  const li = document.createElement('li');

  li.innerText = message;

  messageUl.appendChild(li);
};

socket.on('serverMessage', (message) => createMessage(message));

window.onbeforeunload = () => {
  socket.disconnect();
};
