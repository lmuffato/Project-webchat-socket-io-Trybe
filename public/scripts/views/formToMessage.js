function newMessage(event) {
  event.preventDefault();
  const { socket } = window;
  const nameInput = document.forms[0][0];
  const messageInput = document.forms[0][1];
  socket.emit('message', { 
    nickname: nameInput.value, chatMessage: messageInput.value,
  });
}

document.forms[0].onsubmit = newMessage;