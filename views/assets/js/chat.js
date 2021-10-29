const chatSocket = window.io();
const messageForm = document.querySelector('#message-form');
const inputMessage = document.querySelector('#message-input');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let chatMessage = inputMessage.value;
  const nickname = document.querySelector('#online-user').innerHTML;
  chatSocket.emit('message', { nickname, chatMessage });
  inputMessage.value = '';
  chatMessage = '';
  return false;
});

const createMessage = (chatMessage) => {
  const messageUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerHTML = chatMessage;
  li.setAttribute('data-testid', 'message');
  messageUl.appendChild(li);
};

window.onbeforeunload = () => {
  chatSocket.disconnect();
};
  
chatSocket.on('message', (chatMessage) => createMessage(chatMessage));
