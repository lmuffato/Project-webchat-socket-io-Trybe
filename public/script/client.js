const socket = window.io();

const sendButton = document.querySelector('#sendButton');
const inputMessage = document.querySelector('#messageBox');

const saveButton = document.querySelector('#nicknameButton');
const inputNickname = document.querySelector('#nicknameBox');

sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  const nick = document.getElementById(socket.id.slice(0, 16)).title;
  socket.emit('message', { chatMessage: inputMessage.value, nickname: nick });
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

saveButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (inputNickname.value) {
    const newNickname = inputNickname.value;
    const greeting = document.querySelector('#greeting').firstChild;
    greeting.innerText = `Olá, ${newNickname}!`;
    greeting.setAttribute('title', newNickname);
    inputNickname.value = '';
    socket.emit('newNickname', newNickname);
  }
});

const onlineUsers = (users) => {
  const userUl = document.querySelector('#userList');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.setAttribute('id', users);
  li.innerText = users;
  userUl.appendChild(li);
};

const userGreeting = (userName) => {
  const userSpan = document.querySelector('#greeting');
  const p = document.createElement('p');
  p.setAttribute('id', userName);
  p.innerText = `Olá, ${userName}!`;
  userSpan.appendChild(p);
};

socket.on('userList', (users) => {
  const userUl = document.querySelector('#userList');
  const usersQty = userUl.childElementCount;
  if (usersQty > 0) {
    while (userUl.firstChild) {
      userUl.removeChild(userUl.lastChild);
    }
  }
  users.forEach((user) => onlineUsers(user)); 
});
socket.on('userName', (userName) => userGreeting(userName)); 