const nicknameSocket = window.io();

const firstName = [
  'Joseph',
  'Joãozin',
  'Antônio',
  'Francisco',
  'Carlos',
  'Paulon',
  'Pedron',
  'Luccas',
  'Luizin',
  'Marcos',
  'Mariah',
  'Adriana',
  'Brunao',
  'Juliana',
  'Márcia',
  'Fernanda',
  'Patrícia',
  'Alinee',
  'Sandra',
  'Camila',
];

const lastName = [
  'Duboporgakh',
  'Ironfistall',
  'Lugurhandd',
  'Bradburgon',
  'Arsgardian',
  'Azulkgamph',
  'Lurthbumph',
  'Fortprider',
  'Firacoding',
  'Helvetican',
  'Mizanganck',
  'Zefeythall',
];

const generateNickname = () => {
  const nickFirst = firstName[Math.floor(Math.random() * firstName.length)];
  const nickLast = lastName[Math.floor(Math.random() * lastName.length)];
  const nickname = `${nickFirst}_${nickLast}`;
  return nickname.slice(0, 16);
};

const nicknameForm = document.querySelector('#nickname-form');

const changeNickname = (nickname) => {
  const renderNickname = document.querySelector('#online-user');
  renderNickname.innerHTML = nickname;
};

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newNickname = document.querySelector('#nickname-box');
  changeNickname(newNickname.value);
  nicknameSocket.emit('nickname', newNickname.value);
  newNickname.value = '';
  return false;
});

window.onload = () => {
  const nickname = generateNickname();
  nicknameSocket.emit('nickname', nickname);
};

nicknameSocket.on('nickname', (nickname) => changeNickname(nickname));
