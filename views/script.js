const client = window.io();

const sendBtn = document.getElementById('send-btn');
const input = document.getElementById('message');
const list = document.getElementById('list');

const createMsg = (msg) => {
  const li = document.createElement('li');
  li.innerText = msg;
  list.append(li);
};

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (input.value) {
    const nickname = client.id;
    client.emit('message', { chatMessage: input.value, nickname });
  }
});

client.on('message', (msg) => createMsg(msg));