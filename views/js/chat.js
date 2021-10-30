const socket = window.io();

const formToChoiceNickname = document.getElementById('formToChoiceNickname');
const usersLogged = document.getElementById('usersLogged');

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

formToChoiceNickname.addEventListener('submit', (e) => {
  e.preventDefault();
  const nicknameBox = document.getElementById('nickname-box');
  const currentUser = usersLogged.firstElementChild;
  currentUser.innerText = nicknameBox.value;
  socket.emit('newNickname', { newNickname: currentUser.innerText, id: currentUser.id });
});

socket.on('changeNickname', ({ newNickname, id }) => {
  const nickNameToChange = document.getElementById(id);
  nickNameToChange.innerText = newNickname;
});
