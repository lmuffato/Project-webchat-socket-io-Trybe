const moment = require('moment');

const formatDateInformation = (chatMessage, nickname) => {
  const date = moment().format('DD-MM-yyyy HH:mm');
  return `${date} - ${nickname}: ${chatMessage}`;
};

module.exports = (io) => 
  io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', formatDateInformation(chatMessage, nickname));
  });
});

// Format date reference: https://stackoverflow.com/questions/15993913/format-date-with-moment-js;