require('dotenv/config');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.BACKEND_PORT || 3000;
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('./sockets/chatSocket')(io);

app.use(express.static(path.join(__dirname, '/views')));

app.set('view engine', 'ejs');
app.set('views', './views/pages');

const chatController = require('./controllers/chatController');

const corsOptions = {
  origin: `http://localhost:${PORT}`,
};

app.use(cors(corsOptions));

app.get('/', chatController.renderWebchat);

server.listen(PORT, () => console.log(`Webchat server running on port ${PORT}!`));
