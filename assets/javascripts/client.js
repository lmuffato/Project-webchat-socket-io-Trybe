const socket = window.io('http://localhost:3000');

// aqui está alimentando o csr

socket.on('message', (data) => {
  const li = document.createElement('li');
  const liText = document.createTextNode(data);
  li.setAttribute('data-testid', 'message');
  li.append(liText);
  document.getElementById('board-message').appendChild(li);
});

const setNickname = (nickname) => {
  const li = document.createElement('li');
  const liNick = document.createTextNode(nickname);
  li.setAttribute('data-testid', 'online-user');
  li.append(liNick);
  document.getElementById('online-users').appendChild(li);
};

// da para organizar em outra pasta daqui pra baixo (?)
let nickname;

socket.on('nicknameGenerator', ({ newNickname }) => setNickname(newNickname));
socket.on('nickname', (userId) => {
  nickname = userId;
  setNickname(nickname);
});

const nicknameBtn = document.getElementById('nickname-button');
nicknameBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const nicknameInput = document.getElementById('input-nickname');
  nickname = nicknameInput.value;
  socket.emit('nickname', nickname);
  nicknameInput.value = '';
});

const sendBtn = document.getElementById('send-button');
sendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const text = document.getElementById('input-message');
  socket.emit('message', { nickname, chatMessage: text.value });
  text.value = '';
});