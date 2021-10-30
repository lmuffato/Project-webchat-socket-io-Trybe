/**
 * @type {import('socket.io-client').Socket}
 */
const socket = window.io();

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const messages = document.querySelector('.messages');
const DATATESTID = 'data-testid';
const USERLIST = '.usersList';

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

let nickname = sessionStorage.getItem('nickName') || makeid(16);

socket.emit('listUser', nickname);
// 1 envio o nickname para o backend

const createUserLi = (user) => {
  const listUser = document.querySelector(USERLIST);
  const li = document.createElement('li');
  li.textContent = user;
  li.setAttribute(DATATESTID, 'online-user');
  listUser.append(li);
};

socket.on('listUser', createUserLi);
// 4 com o usuario que eu mandei na linha 26, passando pelo backend, ele me retorna para que eu possa utiliza-lo na função acima - aparentemente é o fim do pingpong do listuser

socket.on('usersOnline', (users) => {
  // 6 aqui recebemos o array novamente, possivelmente atualizado.
  const listUser = document.querySelector(USERLIST);
  listUser.innerHTML = '';
  users.forEach((user) => createUserLi(user));
  // 7 aqui, populamos a nossa lista com os novos usuários logados!
});

function changeNickName() {
  const changeName = document.querySelector('.userForm');
  changeName.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickNameInput = document.querySelector('.nickNameInput');
    sessionStorage.setItem('nickName', nickNameInput.value);
    nickname = nickNameInput.value;
    nickNameInput.value = '';
    socket.emit('changeUserName', nickname);
  });// 9 Aqui, estamos obtendo o a string que irá substituir o ID aleatório que será criado no passo #1
}

changeNickName();

socket.on('changeUserName', ([oldName, newName]) => {
  const listUser = document.querySelector(USERLIST);
  const liUserChanging = [...listUser.children].find((element) => element.textContent === oldName);
  liUserChanging.textContent = newName;
});

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

socket.on('dbMessages', (msgs) => {
  msgs.forEach(({ data: { message, nickname: nick, timestamp } }) => {
    const li = document.createElement('li');
    li.textContent = `${timestamp} ${nick} ${message}`;
    li.setAttribute(DATATESTID, 'message');
    messages.append(li);
  });
  window.scrollTo(0, document.body.scrollHeight);
});

// aqui eu percebi que é um evento que ouve nada de ninguém, exercendo a mesma função do evento disconnect do backend!
// socket.on('disconnectUser', (userDisconnected) => {
//   const userList = document.querySelector(USERLIST).children;
//   const userLoggedOut = [...userList].find(
//     (user) => user.textContent === userDisconnected,
//   );
//   userLoggedOut.remove();
// });

socket.on('message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  li.setAttribute(DATATESTID, 'message');
  messages.append(li);
  window.scrollTo(0, document.body.scrollHeight);
});
