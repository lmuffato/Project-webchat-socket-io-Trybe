const display = document.getElementById('messagesDisplay');

function appendMessage() {
  const { socket } = window;
  socket.on('message', (message) => {
    const div = document.createElement('div');
    const testPass = document.createElement('p');
    const p = document.createElement('p');
    testPass.setAttribute('data-testid', 'message');
    testPass.append(message);
    p.append(message.slice(36));
    div.className = 'message';
    socket.on('author-message', (authorMessage) => {
      if (authorMessage === message) div.className = 'author-message';
    });
    div.appendChild(testPass);
    div.appendChild(p);
    display.appendChild(div);
    new Audio('./newmessage.mp3').play();
  });
}

appendMessage();
