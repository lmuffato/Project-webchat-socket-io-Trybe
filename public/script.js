/**
 * @type {import('socket.io-client').Socket}
 */
const socket = window.io();

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const messages = document.querySelector('.messages');

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
return result;
}

const nickname = makeid(16);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const msg = {
    chatMessage: input.value,
    nickname,
  };

  if (input.value) {
    socket.emit('message', msg);
    input.value = '';
  }
});

socket.on('message', (msg) => {
const li = document.createElement('li');
li.textContent = msg;
messages.append(li);
window.scrollTo(0, document.body.scrollHeight);
});
