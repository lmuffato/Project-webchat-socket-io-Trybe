/**
 * @param {import('socket.io').Socket} socket
 */

module.exports = (socket) => {
  socket.on('message', ({ nickname, chatMessage }) => {
    console.log(`DD-MM-yyyy HH:mm:ss ${nickname} ${chatMessage}`);
  });
};
