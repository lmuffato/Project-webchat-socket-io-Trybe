const socket = window.io();

const sendButton = document.querySelector('#sendButton');
const inputMessage = document.querySelector('#messageBox');

sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: socket.id.slice(1, 17) });
  inputMessage.value = '';
});

const newMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (chatMessage) => newMessage(chatMessage)); 