const socket = window.io();

// const form = document.querySelector('#form-msg');

// const btnSendMsg = document.document.querySelector('#btn-msg');
// const btnSavelNickName = document.document.querySelector('#form');
// const BoxMessageList = document.document.querySelector('#mensagem');
// const boxClientsList = document.document.querySelector('#box-message');

const dataTestId = 'data-testid';

const clientId = 'client';

let myNickName = '';

const getMyNickName = (name) => {
  myNickName = name;
};

const autoScrolling = () => {
  const textArea = document.getElementById('box-message');
  textArea.scrollTop = textArea.scrollHeight;
};

const getDocumenById = (id) => document.getElementById(id);

// Envia a mensagem para o servidor
const sendMessageToserver = ({ chatMessage, nickname }) => {
  socket.emit('message', { chatMessage, nickname });
};

// Altera o nome do usuário
// Envia a mensagem para o servidor
const saveNickNameinToserver = () => {
  const btn = getDocumenById('btn-nickName');
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    const nickName = getDocumenById('nickName').value;
    console.log(nickName);
    socket.emit('nickName', nickName);
  });
  return null;
};

// Ao clicar no botõa para enviar a mensagem
const eventSendMessage = () => {
  const form = getDocumenById('form-msg');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputMessage = getDocumenById('messageInput').value;
    const inputNickName = myNickName;
    // const inputNickName = getDocumenById('nickName').value;
    const message = { chatMessage: inputMessage, nickname: inputNickName };
    getDocumenById('messageInput').value = '';
    sendMessageToserver(message);
    return message;
  });
};

// Remove elementos pelo id
const removeElementById = (id) => {
  const arr = document.querySelectorAll(`#${id}`);
  arr.forEach((ele) => ele.remove());
};

// Cria a mensagem no front-end
const createUserMsgLiElement = (message) => {
  const messageUl = document.querySelector('#mensagem');
  const li = document.createElement('li');
  li.setAttribute(dataTestId, 'message');
  li.innerText = message;
  messageUl.appendChild(li);
  autoScrolling();
};

// Recurar o histórico de mensagens
const historyMessages = (arr) => {
  const messageUl = document.querySelector('#mensagem');
  arr.forEach((ele) => {
    const { timestamp, nickname, message } = ele;
    const li = document.createElement('li');
    li.setAttribute(dataTestId, 'message');
    li.innerText = `${timestamp} - ${nickname}: ${message}`;
    messageUl.appendChild(li);
  });
};

// Cria a mensagem no front-end
const createServerMsgLiElement = (message) => {
  const messageUl = document.querySelector('#mensagem');
  const li = document.createElement('li');
  li.innerText = message;
  messageUl.appendChild(li);
  autoScrolling();
};

// Atualiza a lista de clients
const updateClients = (arr, id) => {
  removeElementById(clientId);
  const user = document.querySelector(`#${id}`);
  arr.forEach((ele) => {
    const li = document.createElement('li');
    li.setAttribute(dataTestId, 'online-user');
    li.id = clientId;
    li.innerText = ele;
    user.appendChild(li);
  });
};

// Cria a lista de clientes ativos
const updateClientsActives = (arr) => {
  updateClients(arr, 'clients');
};

socket.on('msgHistoric', (arr) => historyMessages(arr));
socket.on('myNick', (str) => getMyNickName(str));
socket.on('message', (str) => createUserMsgLiElement(str));
socket.on('serverMessage', (str) => createServerMsgLiElement(str));
socket.on('activeClients', (arr) => updateClientsActives(arr));

window.onload = () => {
  eventSendMessage();
  saveNickNameinToserver();
};
