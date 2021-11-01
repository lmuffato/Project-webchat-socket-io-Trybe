const socket = window.io();

// Buscar os IDs
const inputNickname = document.querySelector('#input-nickname');
const botaoNickName = document.querySelector('#botao-nickname');
const inputMessage = document.querySelector('#input-message');
const botaoMessage = document.querySelector('#botao-message');

// Explicação e ajuda do Guilherme Dornelles - Um dia te pago um suco de Bergamota!
let userName = '';

botaoMessage.addEventListener('click', (evento) => {
  evento.preventDefault();
  const nickname = userName || socket.id.slice(0, 16);
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
});

const mensagemUsuario = (message) => {
  const mensagem = document.getElementById('mensagensUsuarios');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  mensagem.appendChild(li);
};

botaoNickName.addEventListener('click', (evento) => {
  evento.preventDefault();
  userName = inputNickname.value;
  if (userName !== '') {
    socket.emit('novoUsername', userName);
    inputNickname.value = '';
  }
});

const quemTaON = (quemQuerTC) => {
  console.log(quemQuerTC);
  const usuarios = document.getElementById('usuariosOnline');
  usuarios.innerHTML = '';
  quemQuerTC.forEach((elemento) => {
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'online-user');
    li.innerText = elemento;
    usuarios.appendChild(li);
  });
};

socket.on('message', (chatMessage) => mensagemUsuario(chatMessage));

socket.on('quemTaON', (quemQuerTC) => quemTaON(quemQuerTC));