const socket = window.io();

const changeCurrentNickname = document.getElementById('changeCurrentNickname');
const usersLogged = document.getElementById('usersLogged');
let nickWithNumbers;

socket.emit('initConnection');

const insertNicknameUserLogged = (nickname) => {
  const newUserLogged = document.createElement('li');
  newUserLogged.innerText = nickname;
  newUserLogged.setAttribute('data-testid', 'online-user');
  newUserLogged.id = nickname;
  usersLogged.appendChild(newUserLogged);
  socket.emit('userNickname', {
     id: newUserLogged.id, 
     innerText: newUserLogged.innerText,
    });
};

socket.on('addNickinameInOtherUser', (newUserLogged) => {
  const otherUser = document.createElement('li');
  otherUser.innerText = newUserLogged.innerText;
  otherUser.id = newUserLogged.id;
  otherUser.setAttribute('data-testid', 'online-user');

  usersLogged.appendChild(otherUser);
});

socket.on('showNicknamesOfUsersLoggeds', (newNicknameFormated) => {
  nickWithNumbers = newNicknameFormated;
  insertNicknameUserLogged(newNicknameFormated);
});

changeCurrentNickname.addEventListener('submit', (e) => {
  e.preventDefault();
  const nicknameBox = document.getElementById('nickname-box');
  const currentUser = document.getElementById(nickWithNumbers);
  currentUser.innerText = nicknameBox.value;
});
