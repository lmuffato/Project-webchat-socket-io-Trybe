const socket = window.io();
const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let chatMessage = inputMessage.value;
  const nickname = socket.id;
  socket.emit('message', {nickname, chatMessage});
  // console.log(chatMessage);
  inputMessage.value = '';
  chatMessage = '';
  return false;
});
  
const createMessage = (chatMessage) => {
  // const { nickname } = chatMessage;
  // console.log('o chat', chatMessage.nickname);
  // console.log(chatMessage);
  const messageUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerHTML = chatMessage;
  li.setAttribute('data-testid', 'message');
  messageUl.appendChild(li);
};

window.onbeforeunload = () => {
  socket.disconnect();
};
  
socket.on('message', (chatMessage) => createMessage(chatMessage));
