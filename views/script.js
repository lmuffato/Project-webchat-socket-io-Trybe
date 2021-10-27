const client = window.io();

const button = document.querySelector('#button-teste');

button.addEventListener('click', () => {
  const author = document.querySelector('#username').value;
  const message = document.querySelector('#message-teste').value;

  if (author.length && message.length) {
    const newMsg = {
      chatMessage: message,
      nickname: author,
    };
    console.log(newMsg);
    client.emit('message', newMsg);
  }
});