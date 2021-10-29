const display = document.querySelector('.messagesDisplay');

function createNameLabel(name) {
  const nameSpan = document.createElement('span');
  nameSpan.append(name);
  nameSpan.className = 'author-name';
  return nameSpan;
}

function createTimeLabel(time) {
  const timeSpan = document.createElement('span');
  const timeSliced = time.slice(0, -3);
  timeSpan.append(timeSliced);
  timeSpan.className = 'time-message';
  return timeSpan;
}

function createMessageBalloon(message) {
  const div = document.createElement('div');
  const testPass = document.createElement('p');
  const p = document.createElement('p');
  testPass.setAttribute('data-testid', 'message');
  testPass.append(message);
  testPass.className = 'hidden';
  const messageTime = message.split('|')[1];
  const messageAuthor = message.split('|')[2];
  const messageContent = message.split('|')[3];
  const nameLabel = createNameLabel(messageAuthor);
  const timeLabel = createTimeLabel(messageTime);
  p.append(messageContent);
  div.className = 'message';
  div.appendChild(nameLabel);
  div.appendChild(testPass);
  div.appendChild(p);
  div.appendChild(timeLabel);
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
