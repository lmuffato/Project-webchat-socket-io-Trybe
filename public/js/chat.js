const socket = window.io();

const messageForm = document.querySelector('#messageForm');
const nickForm = document.querySelector('#nickForm');
const inputMessage = document.querySelector('#messageInput');
const inputNick = document.querySelector('#nickNameInput');
const connectedUsers = document.querySelector('#connectedUsers')

let nick = '';

messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nickname = nick || (socket.id).substring(0, 16);
  const messageObj = { chatMessage: inputMessage.value, nickname };
  socket.emit('message', messageObj);
  inputMessage.value = '';
  return false;
});

nickForm.addEventListener('submit', (e) => {
  e.preventDefault();
  nick = inputNick.value;
  if (nick) {
    socket.emit('changeNick', nick);
    inputNick.value = '';
    return false;
  }
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

const createConnectedUserCard = (userId) => {
  const usersList = connectedUsers;
  const li = document.createElement('li');
  li.innerText = userId.substring(0, 16);
  li.setAttribute('data-testid', 'online-user');
  usersList.append(li);
}

const getNick = () => {
  return inputNick.value || null;
}

socket.on('message', (message) => createMessage(message));
socket.on('userConnection', (users) => {
  connectedUsers.innerHTML = '';
  users.forEach((user) => createConnectedUserCard(user))
});
socket.on('recoverMessages', (messages) => {
  messages.forEach(({ chatMessage, timestamp, nickname }) => {
    const serializedMessage = `${timestamp} - ${nickname}: ${chatMessage}`;
    createMessage(serializedMessage);
  })
});