const socket = window.io('http://localhost:3000');

// AQUI ENVIA PRO EJS MONTAR A PAGINA
socket.on('message', (data) => {
  const li = document.createElement('li');
  const liText = document.createTextNode(data);
  li.append(liText);
  document.getElementById('board-message').appendChild(li);
});

// O NICKNAME PRECISA CHEGAR AQUI E SER RETORNADO NA LI-16 JUNTO COM A MESSAGE
const sendBtn = document.getElementById('send-button');
sendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const text = document.getElementById('input-message');
  socket.emit('message', { chatMessage: text.value });
  text.value = '';
});