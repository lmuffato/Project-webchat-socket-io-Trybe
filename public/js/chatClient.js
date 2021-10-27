const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
// const userNick = document.querySelector('#nickname');

// const setRandomName = () => {
//   sessionStorage.setItem('name', randomName());
//   const name = sessionStorage.getItem('name');
//   userNick.innerText = name;
//   console.log(userNick.innerText);
// };

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  const nickname = socket.id;
  socket.emit('message', { chatMessage, nickname });
  inputMessage.value = '';
  return false;
});

const serverMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => serverMessage(message));

window.onbeforeunload = () => {
  socket.disconnect();
};

// window.onload = () => setRandomName();