const socket = window.io();

const insertNicknameUserLogged = (nickname) => {
  const usersLogged = document.getElementById('usersLogged');
  const newUserLogged = document.createElement('li');
  newUserLogged.innerText = nickname;
  newUserLogged.setAttribute('data-testid', 'online-user');
  usersLogged.appendChild(newUserLogged);
};

socket.emit('initConnection');

socket.on('showNicknamesOfUsersLoggeds', (newNicknameFormated) => {
  insertNicknameUserLogged(newNicknameFormated);

  // sessionStorage.setItem('nickname', JSON.stringify(newNicknameFormated));

  // sessionStorage.setItem('nickname', JSON.stringify(newNicknameFormated));
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
