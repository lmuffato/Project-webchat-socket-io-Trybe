const socket = window.io();

const usersUl = document.querySelector('#usersOnline');

let nickname = '';
const DATA_TESTID = 'data-testid';

const usersList = (userList) => {
  nickname = userList[socket.id];
  usersUl.innerHTML = '';
  const li = document.createElement('li');
  li.setAttribute(DATA_TESTID, 'online-user');
  li.setAttribute('id', 'usersList');
  li.innerText = nickname; 
    usersUl.appendChild(li);
  const nicknameList = Object.values(userList);
  nicknameList.forEach((id) => {
    if (id !== nickname) {
      const liUsers = document.createElement('li');
      liUsers.setAttribute(DATA_TESTID, 'online-user');
      liUsers.setAttribute('id', 'usersList');
      liUsers.innerText = id; 
      usersUl.appendChild(liUsers);
    }
  });
};

socket.on('usersList', (userList) => usersList(userList));
