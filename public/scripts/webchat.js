const socket = window.io();

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

  sessionStorage.setItem('nickname', nickname);

  html.onlineUser.innerHTML = nickname;

  const data = { nickname };

  socket.emit('replaceNickname', data);
});

html.messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const chatMessage = html.messageInput.value;
  const nickname = html.nicknameInput.value;

  const data = { chatMessage, nickname };

  if (chatMessage.length > 0) {
    socket.emit('message', data);
  }
});

function addNewUser(data) {
  console.log(data);
}

function handleOnMessage(chatMessage) {
  const message = document.createElement('li');
  message.innerHTML = chatMessage;
  message.setAttribute('data-testid', 'message');

  html.listMessage.appendChild(message);
}

function createListUsers(userArrayList) {
  console.log(userArrayList);
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
    const nickname = `user-${makeRandomUser(11)}`;
  
    html.nicknameInput.value = nickname;
    html.onlineUser.innerHTML = nickname;
}

socket.on('addNewUser', addNewUser);
socket.on('message', handleOnMessage);
socket.on('refreshList', createListUsers);
socket.on('connect', gerateUserID);

window.onload = () => {
  const nickname = sessionStorage.getItem('nickname');
  
  html.nicknameInput.value = nickname;
};