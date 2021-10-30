const socket = window.io('http://localhost:3000');

const userButton = document
  .querySelector('.webchat_nickname__button');
const userBox = document
  .querySelector('.webchat_user__box');
const messageButton = document
  .querySelector('.webchat__message__button');
const messageBox = document
  .querySelector('.webchat__message__box');

const saveSessionStorage = (key, value) => window.sessionStorage.setItem(key, value);
const getSessionStorage = (key) => window.sessionStorage.getItem(key);

const createElementsNickNameInTheBox = (nicknames) => {
  const firstUser = getSessionStorage('user');

  nicknames.forEach((nickname) => {
    const nicknameElement = document.createElement('li');
    nicknameElement.setAttribute('data-testid', 'online-user');
    nicknameElement.textContent = nickname;
    nicknameElement.classList.add('online-user');
    if (firstUser === nickname) {
      userBox.prepend(nicknameElement);
      return;
    }
    userBox.appendChild(nicknameElement);
  });
};

const deleteElementsNickNameInTheBox = () => {
  const nicknameElements = document.querySelectorAll('.online-user');
  nicknameElements.forEach((nicknameElement) => {
    nicknameElement.remove();
  });
};

const createElementsMessageInTheBox = (message) => {
  const messageElement = document.createElement('li');
  messageElement.setAttribute('data-testid', 'message');
  messageElement.textContent = message;
  messageBox.appendChild(messageElement);
};

userButton.addEventListener('click', (_e) => {
  const nickname = document.querySelector('.webchat_nickname__input');
  socket.emit('nickname', nickname.value);
  saveSessionStorage('user', nickname.value);
  nickname.value = '';
});

socket.on('nickname', (nickname) => {
  saveSessionStorage('user', nickname);
});

socket.on('listUsers', (nicknames) => {
  deleteElementsNickNameInTheBox();
  createElementsNickNameInTheBox(nicknames);
});

messageButton.addEventListener('click', (_e) => {
  const message = document.querySelector('.webchat__message__input');
  // const onlineUser = document.querySelectorAll('.online-user');
  // const nickname = onlineUser[onlineUser.length - 1].textContent;
  const nickname = getSessionStorage('user');
  socket.emit('message', { chatMessage: message.value, nickname, socketId: socket.id });

  message.value = '';
});

socket.on('message', (message) => {
  createElementsMessageInTheBox(message);
});

window.onbeforeunload = () => {
  socket.disconnect();
};
