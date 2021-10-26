// Faça seu código aqui
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();
// const cors = require('cors');
require('dotenv').config();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET, POST'],
  },
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', (req, res) => {
  res.render('index.ejs');
});

require('./sockets/chat')(io);

http.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
