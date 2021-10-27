const webchatModel = require('../models/webchat');

const socket = window.io();

const saveNicknameButton = document.querySelector('#nickname-button');
saveNicknameButton.addEventListener('click', () => {
  socket.emit('ping');
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const getAll = async (_req, res) => {
  const result = await webchatModel.getAll();
  res.status(200).render('../views/chat.ejs', { result });
};

socket.on('pong', (mensagem) => createMessage(mensagem));

module.exports = {
  getAll,
  createMessage,
};
