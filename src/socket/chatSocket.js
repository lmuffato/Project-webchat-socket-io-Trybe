const moment = require('moment');
const { createMessage, getAll } = require('../../models/Messages');

let usersArray = [];

function addNewUser(nickname, io, socketId) {
  const newUser = { nickname, id: socketId };

  let userOnList = false;

  usersArray.forEach((user) => {
    if (user.id === socketId) {
      userOnList = true;
    }
  });

  if (!userOnList) {
    usersArray.push(newUser);

    console.log(usersArray);
    console.log('total de usuários:', usersArray.length);
    
    io.emit('refreshListUser', usersArray);
  }
}

function replaceUserNickName(nickname, io, socketId) {
  usersArray = usersArray.map((user) => {
   if (user.id === socketId) {
     return {
       id: socketId,
       nickname,
     };
   }

    return user;
  });

  io.emit('refreshListUser', usersArray);
}

function removeUserFromUserList(socketId, io) {
  if (usersArray.length === 1) {
    usersArray = [];
    io.emit('refreshListUser', []);
  } else {
    usersArray = usersArray.reduce((userList, user) => {
      if (user.id !== socketId) {
        userList.push(user);
      }
  
      return userList;
    }, []);
  
    io.emit('refreshListUser', usersArray);
  }

  console.log('usuário desconectado');
  console.log('total de usuários:', usersArray.length);
  console.log('');
}

async function handleOnMessage(chatMessage, nickname, io) {
    const messageDate = new Date();

    const formatedDate = moment(messageDate).format('DD-MM-yyyy HH:mm:ss');
    const message = `${formatedDate} - ${nickname}: ${chatMessage}`;
    await createMessage(message);

    io.emit('message', message);
}

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);

    const messages = await getAll();
    io.emit('get-storaged-messages', messages);
    io.emit('refreshListUser', usersArray);
    
    socket.on('add-new-user', (nickname) => { 
      addNewUser(nickname, io, socket.id); 
    });
    
    socket.on('message', 
    ({ chatMessage, nickname }) => handleOnMessage(chatMessage, nickname, io));
    socket.on('replaceNickname', (nickname) => replaceUserNickName(nickname, io, socket.id));
    socket.on('getUserList', () => {
      io.emit('refreshList', usersArray);
    });
    socket.on('disconnect', () => removeUserFromUserList(socket.id, io));
  });
};