// Faça seu código aqui
const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './public');

const io = require('socket.io')(http, {
  cors: {
    origin: `https://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
require('./sockets/chat')(io);

app.use(express.static(`${__dirname}/public`));

app.get('/', (_req, res) => {
  res.status(200).render(`${__dirname}/public/chat.ejs`);
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});