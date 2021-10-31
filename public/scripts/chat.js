// arquivo criado com ajuda do guia:
// https://app.betrybe.com/course/back-end/sockets/sockets-socketio/7eba74a2-260a-4a4d-954e-14d8cc7a9d92/conteudo/20a6c196-10d9-4db5-b20c-cfe68b3dd1d0/construindo-um-chat-com-socketio/d48e7081-f992-4a5f-ba1b-0fe28dd08967?use_case=side_bar

// add socket
const socket = window.io();

// estado da tela

const state = {
  nickname: '',
  id: '',
};

// listando os elementos
const header = document.querySelector('.header');
const idP = document.querySelector('.userID');
const msgInput = document.querySelector('.msgInput');
const sendButton = document.querySelector('.sendButton');
const nicknameInput = document.querySelector('.nickInput');
const nicknameButton = document.querySelector('.nicknameButton');
const onlineUsersList = document.querySelector('.userList');

// função para add msg na UL
const createMessage = (message) => {
  const chat = document.querySelector('.chat');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  chat.appendChild(li);
};

// função para listar os online Users

const listOnlineUsers = (users) => {
  users.forEach((e) => {
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'online-user');
    li.innerText = e;
    onlineUsersList.appendChild(li);
  });
};

// funções util para setar nickname e id user

const setId = (id) => {
  idP.innerText = id;
};

const setUser = (user) => {
  header.innerText = `Hello, ${user}!!`;
};

const removeUser = (users, socketId) => users.filter((user) => user !== socketId);

// add evento no save

nicknameButton.addEventListener('click', (e) => {
  console.log(e);
  const { value } = nicknameInput;
  socket.emit('newUserName', { nickName: value });
  state.nickname = value;
  sessionStorage.setItem('nickname', value);
  setUser(value);
});

// add evento no sendButton
sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  const chatMessage = msgInput.value;
  const { nickname } = state;
  socket.emit('message', { chatMessage, nickname });
  msgInput.value = '';
});

// listen event on socket
socket.on('message', (msg) => {
  createMessage(msg);
  console.log(msg);
});

socket.on('userData', (data) => {
  setUser(data.nickname);
  setId(data.nickname);
  state.id = data.id;
});

socket.on('usersOnline', (users) => {
  const saveSocketNick = users[state.id];
  const usersArr = Object.values(users);
  const usersArr2 = removeUser(usersArr, saveSocketNick);
  const renderArr = [saveSocketNick, ...usersArr2];
  onlineUsersList.innerHTML = '';
  console.log(renderArr);
  listOnlineUsers(renderArr);
});

window.onbeforeunload = () => {
  socket.disconnect();
};
