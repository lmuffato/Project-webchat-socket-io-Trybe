const socket = window.io();

const changeCurrentNickname = document.getElementById('changeCurrentNickname');
const usersLogged = document.getElementById('usersLogged');
let nickWithNumbers;

const insertNicknameUserLogged = (nickname) => {
  const newUserLogged = document.createElement('li');
  newUserLogged.innerText = nickname;
  newUserLogged.setAttribute('data-testid', 'online-user');
  newUserLogged.id = nickname;
  usersLogged.appendChild(newUserLogged);
};

socket.emit('initConnection');

socket.on('showNicknamesOfUsersLoggeds', (newNicknameFormated) => {
  nickWithNumbers = newNicknameFormated;
  insertNicknameUserLogged(newNicknameFormated);

  // sessionStorage.setItem('nickname', JSON.stringify(newNicknameFormated));

  // sessionStorage.setItem('nickname', JSON.stringify(newNicknameFormated));
});

changeCurrentNickname.addEventListener('submit', (e) => {
  e.preventDefault();
  const nicknameBox = document.getElementById('nickname-box');
  const currentUser = document.getElementById(nickWithNumbers);
  currentUser.innerText = nicknameBox.value;
});

// const { username, room } = Qs.parse(location.search, {
//   ignoreQueryPrefix: true});

// socket.emit('joinRoom', { username, room });

// const createMessage = (message) => {
//   const messagesUl = document.querySelector('#messages');
//   const li = document.createElement('li');
//   li.innerText = message;
//   messagesUl.appendChild(li);
// }

// socket.on('serverMessage', (message) => createMessage(message));

// socket.emit('joinRoom', { username, room });

// const form = document.querySelector('form');
// const inputMessage = document.querySelector('#messageInput');

// form.addEventListener('submit', (e) =>{
//   e.preventDefault();
//   const message = inputMessage.value;
//   socket.emit('roomClientMessage', { room, message });
//   inputMessage.value = '';
//   return false;
// });
