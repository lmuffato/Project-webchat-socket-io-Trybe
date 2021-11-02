const socket = window.io();
const clientId = 'client';
const $ = document.getElementById.bind(document);

let nick = '';

const getNick = (name) => {
  nick = name;
};

const sendMessage = ({ chatMessage, nickname }) => {
  socket.emit('message', { chatMessage, nickname });
};

const saveNick = () => {
  const btn = $('savenick');

  btn.addEventListener('click', (event) => {
    event.preventDefault();
    const nickName = $('inputnick').value;
    socket.emit('nickName', nickName);

    console.log(nickName);
  });

  return null;
};

const getMessage = () => {
  const form = $('form-box');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputMessage = $('inputmessage').value;
    const inputNickName = nick;
    const message = { chatMessage: inputMessage, nickname: inputNickName };

    $('inputmessage').value = '';
    sendMessage(message);

    return message;
  });
};

const removeElementById = (id) => {
  const arr = document.querySelectorAll(`#${id}`);
  arr.forEach((ele) => ele.remove());
};

const createUserMsg = (message) => {
  const messageUl = document.querySelector('message-list');
  const li = document.createElement('li');

  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messageUl.appendChild(li);
};

const creteServerMsg = (message) => {
  const messageUl = document.querySelector('message-list');
  const li = document.createElement('li');

  li.innerText = message;
  messageUl.appendChild(li);
};

const updateClients = (arr, id) => {
  removeElementById(clientId);
  const user = document.querySelector(`#${id}`);

  arr.forEach((e) => {
    const li = document.createElement('li');

    li.setAttribute('data-testid', 'online-user');
    li.id = clientId;
    li.innerText = e;
    user.appendChild(li);
  });
};

const updateClientsActives = (arr) => {
  updateClients(arr, 'clients');
};

socket.on('myNick', (str) => getNick(str));
socket.on('message', (str) => createUserMsg(str));
socket.on('serverMessage', (str) => creteServerMsg(str));
socket.on('activeClients', (arr) => updateClientsActives(arr));

window.onload = () => {
  getMessage();
  saveNick();
};
