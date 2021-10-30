const client = window.io('http://localhost:3000');

const nick = document.querySelector('#nickname'); // input-nickname
const btnNickname = document.querySelector('#btn-nickname'); // button-nickname
const ulNicknames = document.querySelector('#nicknames'); // ul-nickname

const message = document.querySelector('#message'); // input-message
const ulMessages = document.querySelector('#messages'); // ul-messages
const btnMessage = document.querySelector('#btn-message'); // btn-message

const createNickName = (user) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerHTML = user;
  return li;
};

const createMessage = (msg) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerHTML = msg;
  return li;
};

client.on('message', (msg) => {
  // console.log('msg', msg);
  ulMessages.appendChild(createMessage(msg));
});

client.on('newUser', (user) => {
  // console.log('teste newUser', user);
  ulNicknames.appendChild(createNickName(user));
});

btnNickname.addEventListener('click', (e) => {
  e.preventDefault();
  if (nick.value.length) {
    ulNicknames.childNodes[0].textContent = nick.value;
    nick.value = '';
  }
});

btnMessage.addEventListener('click', (e) => {
  e.preventDefault();
  const chatMessage = message.value;
  const nickname = ulNicknames.childNodes[0].textContent;

  if (message.value.length) {
    client.emit('message', { chatMessage, nickname });
    message.value = '';
  }
});
