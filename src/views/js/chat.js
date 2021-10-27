const Moniker = require('moniker');

const socket = window.io();

let nickname = '';

if (localStorage.getItem('nickname') !== null) {
  nickname = JSON.parse(localStorage.getItem('nickname'));
} else {
  nickname = Moniker.choose();
}

socket.emit('updateName', nickname);