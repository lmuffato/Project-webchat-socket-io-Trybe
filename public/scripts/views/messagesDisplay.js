function appendMessage() {
  const { socket } = window;
  const display = document.getElementById('messagesDisplay');
  socket.on('message', (message) => {
    const p = document.createElement('p');
    p.append(message);
    display.appendChild(p);
  });
}

appendMessage();
