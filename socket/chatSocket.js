// const io = require('socket.io')(socketIoServer, {
//   cors: {
//     origin: `http://localhost:${PORT}`,
//     // methods: ['GET', 'POST'],
//   },
// });

// io.on('connection', (socket) => {
//   socket.on('posting', (data) => {
//     console.log(data);
//     io.emit('notification', { title: 'NAO_MODERADO', message: data.message });
//   });
// });

// socketIoServer.listen(SOCKET_PORT);