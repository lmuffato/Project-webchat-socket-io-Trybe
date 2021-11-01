const names = [
  'addison',
  'brooke',
  'carter',
  'dane',
  'easton',
  'glen',
  'harley',
  'jack',
  'kai',
  'lee',
  'marley',
  'owen',
  'piper',
  'remi',
  'shae',
  'tate',
  'winter',
];

function randomNickname() {
  const randomIndex = Math.round(Math.random() * names.length);
  const randomNumber = Math.round(Math.random() * 9999999999999999);
  return names[randomIndex].padEnd(16, `-${randomNumber}`);
}

const form = {
  nameInput: document.forms[0][0],
  messageInput: document.forms[0][2],
};

const nickname = randomNickname();
document.getElementById('user').textContent = nickname;
form.nameInput.value = nickname;

form.nameInput.onkeyup = ({ target }) => {
  const { socket } = window;
  document.getElementById('user').textContent = target.value;
  socket.emit('new-user', target.value);
  if (target.value === '') {
    document.getElementById('user').textContent = nickname;
    socket.emit('new-user', nickname);
  }
};

function newMessage(event) {
  event.preventDefault();
  const { socket } = window;
  const { nameInput, messageInput } = form;
  if (nameInput.value === '') nameInput.value = nickname;
  if (messageInput.value !== '') {
    socket.emit('message', { 
      nickname: nameInput.value, chatMessage: messageInput.value,
    });
    messageInput.value = '';
  }
}

function newUser() {
  const { socket } = window;
  socket.emit('new-user', nickname);
}
newUser();

document.forms[0].onsubmit = newMessage;