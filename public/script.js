const socket = window.io();
const sendBtn = document.querySelector('#send-button');
const nicknameBtn = document.querySelector('#nickname-button');
let nick;
let currentUserId;
const onlineUsers = 'online-users';
const listOfUsers = document.querySelector(`#${onlineUsers}`);

window.onbeforeunload = () => {
  socket.disconnect();
};

// socket.on('connect', () => {
//   nick = socket.id;
// });

sendBtn.addEventListener('click', () => {
  const messageInput = document.querySelector('#message-input');

  socket.emit('message', {
    chatMessage: messageInput.value,
    nickname: nick || currentUserId,
  });

  messageInput.value = '';
  return false;
});

nicknameBtn.addEventListener('click', () => {
  const nicknameInput = document.querySelector('#nickname-input');

  socket.emit('nickname', {
    nickname: nicknameInput.value,
    id: socket.id,
  });

  nicknameInput.value = '';
  return false;
});

const renderMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');

  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

const createUser = (id, nickname) => {
  const li = document.createElement('li');

  li.innerText = nickname || id;
  li.setAttribute('data-testid', 'online-user');
  li.setAttribute('id', id);
  listOfUsers.appendChild(li);
};

socket.on('currentUserId', (id) => {
  currentUserId = id;
});

socket.on('message', (message) => renderMessage(message));

socket.on('nickname', ({ id, nickname }) => {
  const nicknameToUpdate = document.querySelector(`#${id}`);

  nicknameToUpdate.innerText = nickname;

  if (id === currentUserId) {
    nick = nickname;
  }
});

socket.on('usersList', (clients) => {
  listOfUsers.innerHTML = '';
  const currentUser = clients.find((c) => c.id === currentUserId);
  console.log('🚀 ~ file: script.js ~ line 65 ~ socket.on ~ currentUser', currentUser);

  createUser(currentUser.id, currentUser.nickname);

  const otherUsers = clients.filter((c) => c.id !== currentUserId);
  console.log('🚀 ~ file: script.js ~ line 69 ~ socket.on ~ otherUsers', otherUsers);

  if (otherUsers) {
    otherUsers.forEach(({ id, nickname }) => {
      createUser(id, nickname);
    });
  }

  console.log('🚀 ~ file: script.js ~ line 46 ~ socket.on ~ users', listOfUsers);
});

socket.on('removeUser', (id) => {
  const users = document.querySelector(`#${onlineUsers}`);
  const removeUser = document.querySelector(`#${id}`);

  users.removeChild(removeUser);
});
