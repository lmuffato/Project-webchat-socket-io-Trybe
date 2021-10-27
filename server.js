const express = require('express');

const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

const PORT = 3000;

const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const chatController = require('./controller/chatController');

app.set('view engine', 'ejs');
// app.set('views', './views');

app.use(cors());
app.use('/assets', express.static('./assets/scripts'));
// app.use('/assets', express.static('./assets/css'));

require('./assets/scripts/serverChat')(io);

app.get('/', chatController.showWebChat);

server.listen(PORT, () => console.log(`Server do chat on! Ouvindo na porta ${PORT}`));