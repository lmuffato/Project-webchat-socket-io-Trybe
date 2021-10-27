require('dotenv/config');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.BACKEND_PORT || 3000;
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    // origin: `http://localhost:${PORT}`,
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(path.join(__dirname, '/public')));
// app.use('/', express.static('./public'));

require('./sockets/chat')(io);

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// app.get('/', (req, res) => {
//  res.sendFile(path.join(__dirname, './public', 'index.html'));
// });

server.listen(PORT, () => console.log(`Webchat server running on port ${PORT}!`));
