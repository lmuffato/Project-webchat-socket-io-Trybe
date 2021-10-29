const socket = window.io();
    
const messagesUl = document.getElementById('messages-list');
const usersUl = document.getElementById('online-clients');
const form = document.getElementById('message-form');
const nicknameForm = document.getElementById('change-nick-form');
const nicknameSpan = document.getElementById('nickname');

const DATA_TEST_ID = 'data-testid';

const appendMessages = (message) => {
  const newLi = document.createElement('li');
  newLi.setAttribute(DATA_TEST_ID, 'message');
  newLi.textContent = message;

  messagesUl.appendChild(newLi);
};

const appendMyNickname = (nickname) => {
  usersUl.insertAdjacentHTML(
    'afterbegin', 
    `<li id="my-nickname" data-testid="online-user">${nickname}</li>`,
  );
};

const appendUsers = (users) => {
  usersUl.innerHTML = '';
  const myNickname = sessionStorage.getItem('nickname');
  appendMyNickname(myNickname);

  const allUsers = Object.values(users)
    .filter((user) => user !== myNickname);

  allUsers.forEach((user) => {
    const newLi = document.createElement('li');
    newLi.setAttribute(DATA_TEST_ID, 'online-user');
    newLi.textContent = user;

    usersUl.appendChild(newLi);
  });
};

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();  
  const newNickname = document.getElementById('nick-input').value;

  sessionStorage.setItem('nickname', newNickname);
  socket.emit('nickname', newNickname);
  nicknameSpan.innerText = newNickname;
  // myNickLi.innerText = newNickname;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const msgInput = document.getElementById('message-input');

  socket.emit('message', {
    chatMessage: msgInput.value,
    nickname: sessionStorage.getItem('nickname'),
  });

  msgInput.value = '';
});

socket.on('checkNickname', () => {
  socket.emit('nickname', sessionStorage.getItem('nickname'));
});

socket.on('message', appendMessages);

socket.on('clientsUpdate', appendUsers);

window.onload = () => {
  sessionStorage.setItem('nickname', nicknameSpan.innerText);
};
