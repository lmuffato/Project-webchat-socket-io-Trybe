const socket = window.io();

// const changeCurrentNickname = document.getElementById('changeCurrentNickname');
const usersLogged = document.getElementById('usersLogged');
let nickWithNumbers;

socket.emit('initConnection');

const insertNicknameUserLogged = (nickname) => {
  const newUserLogged = document.createElement('li');
  newUserLogged.innerText = nickname;
  newUserLogged.setAttribute('data-testid', 'online-user');
  newUserLogged.id = nickname;
  newUserLogged.className = 'users';
  usersLogged.appendChild(newUserLogged);
  socket.emit('saveUserOnArray', {
     id: newUserLogged.id, 
     innerText: newUserLogged.innerText,
    });
};

socket.on('showNicknamesOfUsersLoggeds', (newNicknName) => {
  nickWithNumbers = newNicknName;
  insertNicknameUserLogged(newNicknName);
});

socket.on('listOldUsers', (users) => {
  for (let i = 0; i < users.length; i += 1) {
    const newUserLogged = document.createElement('li');
    newUserLogged.innerText = users[i].innerText;
    newUserLogged.setAttribute('data-testid', 'online-user');
    newUserLogged.id = users[i].id;
    usersLogged.appendChild(newUserLogged);
  }
});

// changeCurrentNickname.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const nicknameBox = document.getElementById('nickname-box');
//   const currentUser = document.getElementById(nickWithNumbers);
//   currentUser.innerText = nicknameBox.value;
// });
