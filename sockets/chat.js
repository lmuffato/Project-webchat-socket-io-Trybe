const moment = require('moment');

const date = moment().format('DD-MM-YYYY HH:mm:ss A'); // https://momentjs.com/
module.exports = (io) => io.on('connection', async (socket) => {
    console.log(`Usuárioooooooooo conectado. ID: ${socket.id} `);
  
    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
    });
});
