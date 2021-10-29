const { consolidateDateAndTime } = require('../middlewares/dateAndTime');
const { addToUserArray, changeNick } = require('../middlewares/users');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.emit('setNick', socket.id);

    socket.on('addUser', (usr) => {
      const usrPannel = addToUserArray(usr);
      io.emit('userPannel', usrPannel);
    });

    socket.on('message', (msg) => {
      const { chatMessage, nickname } = msg;
      const msgToSend = `${consolidateDateAndTime()} ${nickname}: ${chatMessage}`;

      io.emit('message', msgToSend);
    });
  });
};
