const client = window.io();

const author = document.getElementsByName('nickname');
const message = document.getElementsById('message-box');
const form = document.getElementById('chat');

form.submit((event) => {
  event.preventDefault();

  if (author.length && message.length) {
    const newMsg = {
      chatMessage: message,
      nickname: author,
    };
    client.emit('message', newMsg);
  }
});