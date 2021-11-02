const express = require('express');
const cors = require('cors');

const app = express();
const expressPort = process.env.PORT || 3000;
const httpServer = require('http').createServer(app);

const corsOptions = {
  origin: `http://localhost:${expressPort}`,
  methods: ['GET', 'POST'],
};

const io = require('socket.io')(httpServer, {
  cors: {
    corsOptions,
  },
});

const { getMessages } = require('./controllers/webchat');

require('./sockets/webchat')(io);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cors(corsOptions));
app.get('/', getMessages);

httpServer.listen(expressPort, () => console.log(`socket rodando na porta ${expressPort}`));