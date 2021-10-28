const socket = window.io();

const createMessage = (message) => {
  console.log(message);
};

socket.on('teste', (mensagem) => createMessage(mensagem));