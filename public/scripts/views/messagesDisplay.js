const display = document.querySelector('.messagesDisplay');

function createMessageBalloon(message) {
  const div = document.createElement('div');
  const testPass = document.createElement('p');
  const p = document.createElement('p');
  testPass.setAttribute('data-testid', 'message');
  testPass.append(message);
  const messageContent = message.split('|')[2];
  p.append(messageContent);
  div.className = 'message';
  div.appendChild(testPass);
  div.appendChild(p);
  return div;
}

function appendMessage() {
  const { socket } = window;
  socket.on('message', (message) => {
    const balloon = createMessageBalloon(message);
    socket.on('author-message', (authorMessage) => {
      if (authorMessage === message) balloon.className = 'author-message';
    });
    display.appendChild(balloon);
    new Audio('./newmessage.mp3').play();
  });
}

appendMessage();
