const express = require('express');

const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const Chat = require('./models/Chat');

const corsOptions = {
  origin: `http://localhost:${PORT}`,
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('./sockets/newUser')(io);
require('./sockets/chat')(io);

// app.get('/messages', Chat.getMessages());

app.get('/', async (req, res) => {
  const messages = await Chat.getMessages();
  res.render('index', { messages });
});

server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
