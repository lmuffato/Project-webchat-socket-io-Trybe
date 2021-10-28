const Moniker = require('moniker');

const socket = window.io();

let nickname = '';

if (localStorage.getItem('nickname') !== null) {
  nickname = JSON.parse(localStorage.getItem('nickname'));
} else {
  nickname = Moniker.choose();
}
socket.emit('updateName', nickname);

const messageTextBox = document.getElementById('write-message');

const buttonSendMessage = document.getElementById('send-message');

const messagesContainer = document.getElementById('messages-container');

const userListContainer = document.getElementById('online-users');

const handleMessage = () => {
  const chatMessage = messageTextBox.value;
  socket.emit('message', { chatMessage, nickname });
};

const addNewMessage = (message) => {
  const newMessage = document.createElement('li');
  newMessage.innerText = message;
  newMessage.classList.add('message');
  newMessage.setAttribute('data-testid', 'online-user');
  messagesContainer.appendChild(newMessage);
};

const updateUserList = (userList) => {
  Object.values(userList).forEach((userNickname) => {
    const newUser = document.createElement('li');
    newUser.innerText = userNickname;
    newUser.classList.add('message');
    newUser.setAttribute('data-testid', 'online-user');
    userListContainer.appendChild(newUser);
  });
};

socket.on('message', addNewMessage);

socket.on('updateUserlist', updateUserList);

buttonSendMessage.addEventListener('onclick', handleMessage);