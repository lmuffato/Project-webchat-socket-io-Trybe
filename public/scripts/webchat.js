const socket = window.io();
// let oldNickname = '';
let storageNickname = '';

const html = {
  nicknameForm: document.querySelector('.nickname-form'),
  messageForm: document.querySelector('.new-message-form'),
  messageInput: document.querySelector('.message-input'),
  nicknameInput: document.querySelector('.nickname-input'),
  listMessage: document.querySelector('.list-message'),
  onlineUser: document.querySelector('.online-user'),
};

html.nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nickname = html.nicknameInput.value;

  if (nickname.length > 0) {
    storageNickname = nickname;

    socket.emit('replaceNickname', nickname);
  
    sessionStorage.setItem('nickname', nickname);
    
    console.log(storageNickname);
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

  console.log(user.nickname, html.nicknameInput.value);

  if (user.nickname === storageNickname) {
    html.onlineUser.insertBefore(listItem, html.onlineUser.firstChild);
  } else {
    html.onlineUser.appendChild(listItem);
  }
}

function createListUsers(userArrayList) {
  html.onlineUser.innerHTML = '';
  userArrayList.map(createListItem);
}

function makeRandomUser(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() 
* charactersLength));
 }
 return result;
}

function gerateUserID() {
  const sessionStoragedNickname = sessionStorage.getItem('nickname');

  if (sessionStoragedNickname) {
    console.log(sessionStoragedNickname);
    socket.emit('addUser', sessionStoragedNickname);
  } else {
    const nickname = `user-${makeRandomUser(11)}`;
    console.log(nickname);
    storageNickname = nickname;

    socket.emit('addUser', nickname);
  }
}

socket.on('refreshListUser', createListUsers);
socket.on('connect', gerateUserID);
socket.on('message', handleOnMessage);

socket.on('get-storaged-messages', (data) => {
  html.listMessage.innerHTML = '';
  data.map((message) => handleOnMessage(message.message));
});

window.onload = () => {
  const nickname = sessionStorage.getItem('nickname');

  storageNickname = nickname;
};