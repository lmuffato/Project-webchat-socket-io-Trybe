const socket = window.io();

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = 'user';
  const message = document.querySelector('.message').value;

  if (nickname.length && message.length) {
    const date = new Date().toLocaleString();
    const actualDate = date.replace(/\//g, '-');
    const sendMessage = {
      message,
      nickname,
      timestamp: actualDate,
    };

    socket.emit('message', sendMessage);
    message.value = '';
  }
});