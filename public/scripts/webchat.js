const socket = window.io();
let storageNickname = '';

const html = {
  nicknameForm: document.querySelector('.nickname-form'),
  messageForm: document.querySelector('.new-message-form'),
  messageInput: document.querySelector('.message-input'),
  nicknameInput: document.querySelector('.nickname-input'),
  listMessage: document.querySelector('.list-message'),
  onlineUsersList: document.querySelector('.online-user-list'),
};

html.nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nickname = html.nicknameInput.value;

  if (nickname.length > 0) {
    storageNickname = nickname;

    socket.emit('replaceNickname', nickname);
    sessionStorage.setItem('nickname', nickname);
  }
});

html.messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const chatMessage = html.messageInput.value;
  const nickname = storageNickname;

  const data = { chatMessage, nickname };

  if (chatMessage.length > 0) {
    socket.emit('message', data);
  }
});

function handleOnMessage(chatMessage) {
  const message = document.createElement('li');
  message.innerHTML = chatMessage;
  message.setAttribute('data-testid', 'message');

  html.listMessage.appendChild(message);
}

function createListItem(user) {
  const listItem = document.createElement('li');
  listItem.innerHTML = user.nickname;
  listItem.setAttribute('data-testid', 'online-user');

  if (user.nickname === storageNickname) {
    if (!html.onlineUsersList.firstChild) {
      html.onlineUsersList.appendChild(listItem);
    } else {
      html.onlineUsersList.insertBefore(listItem, html.onlineUsersList.firstChild);
    }
  } else {
    html.onlineUsersList.appendChild(listItem);
  }
}

function createListUsers(userArrayList) {
  if (userArrayList.length > 0) {
    html.onlineUsersList.innerHTML = '';
    userArrayList.map(createListItem);
  }
}

function makeRandomUser(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

function generateUserNickname() {
  const nickname = sessionStorage.getItem('nickname') || `user-${makeRandomUser(11)}`;
  
  storageNickname = nickname;

  socket.emit('add-new-user', nickname);
}

window.onload = () => {
  const nickname = sessionStorage.getItem('nickname');
  if (nickname) storageNickname = nickname;

  socket.on('refreshListUser', createListUsers);

  socket.on('message', handleOnMessage);

  socket.on('get-storaged-messages', (data) => {
    html.listMessage.innerHTML = '';
    data.map((message) => handleOnMessage(message.message));
  });

  socket.on('connect', generateUserNickname);

  generateUserNickname();
};