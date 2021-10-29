const display = document.querySelector('.messagesDisplay');

function createNameLabel(name) {
  const nameSpan = document.createElement('span');
  nameSpan.append(name);
  nameSpan.className = 'author-name';
  return nameSpan;
}

function createMessageBalloon(message) {
  const div = document.createElement('div');
  const testPass = document.createElement('p');
  const p = document.createElement('p');
  testPass.setAttribute('data-testid', 'message');
  testPass.append(message);
  testPass.className = 'hidden';
  const messageAuthor = message.split('|')[2];
  const messageContent = message.split('|')[3];
  const nameLabel = createNameLabel(messageAuthor);
  p.append(messageContent);
  div.className = 'message';
  div.appendChild(nameLabel);
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
