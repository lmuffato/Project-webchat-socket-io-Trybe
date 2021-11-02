const socket = window.io();

const DATA_TESTID = 'data-testid';

window.onbeforeunload = () => {
  socket.disconnect();
};

const buttonMessage = document.getElementById('send-message');
const buttonChangeNickname = document.getElementById('nickname-button');

const sendMessage = (message) => {
  const { nickname } = JSON.parse(sessionStorage.getItem('clientInfo'));
  socket.emit('message', { nickname, chatMessage: message });
};

buttonMessage.addEventListener('click', () => {
  const inputMessage = document.getElementById('input-message');
  if (!inputMessage.value) {
    alert('a mensagem não pode ser vazia');
  } else {
    sendMessage(inputMessage.value);
    inputMessage.value = '';
  }
});

buttonChangeNickname.addEventListener('click', () => {
  const nicknameInput = document.getElementById('nickname-input');
  if (!nicknameInput.value) {
    alert('o campo nickName não pode ser vazio');
    return;
  }
  console.log('test');
  const { id } = JSON.parse(sessionStorage.getItem('clientInfo'));
  socket.emit('changeNickname', { newNickname: nicknameInput.value, id });
  nicknameInput.value = '';
});

const appendOnlineUsers = (users) => {
  const listOnlineUsers = document.getElementById('online-users');
  listOnlineUsers.innerHTML = '';
  users.forEach(({ nickname }) => {
    const listItem = document.createElement('li');

    listItem.setAttribute('id', nickname);
    listItem.setAttribute(DATA_TESTID, 'online-user');

    listItem.innerText = nickname;

    listOnlineUsers.appendChild(listItem);
  });
};

const appendMessage = (message) => {
  const messageList = document.getElementById('messages');
  const listItem = document.createElement('li');
  listItem.setAttribute(DATA_TESTID, 'message');
  listItem.innerText = message;
  messageList.appendChild(listItem);
};

const renderMessages = (messages) => {
  console.log(messages);
  const messageList = document.getElementById('messages');
  messages.forEach((message) => {
    const listItem = document.createElement('li');
    listItem.setAttribute(DATA_TESTID, 'message');
    listItem.innerText = message;
    messageList.appendChild(listItem);
  });
};

socket.on('clientInfo', (client) => {
  sessionStorage.setItem('clientInfo', JSON.stringify(client));
});

socket.on('online-users', (users) => {
  console.log(users);
  appendOnlineUsers(users);
});

socket.on('messageHistory', renderMessages);

socket.on('message', appendMessage);
