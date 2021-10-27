module.exports = (io) => {
  io.on('connection', async (socket) => {
    const userNickname = socket.id.slice(1, 17);
    console.log(userNickname);
  });
};