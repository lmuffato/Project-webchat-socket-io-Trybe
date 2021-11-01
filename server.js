const express = require('express');

const app = express();
const path = require('path');
const http = require('http').createServer(app);

const PORT = 3000;
const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(express.static(`${__dirname}/views`));

require('./sockets/socket.js')(io);

app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', (_req, res) => {
  res.render('index.ejs');
});

http.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});