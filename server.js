// Faça seu código aqui
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.on('connection', (socket) => {
  console.log(`alguém conectou ${socket.id}`);
});

app.get('/', (req, res) => {
  res.render('index.ejs');
});

http.listen(3000, () => {
  console.log('conectado porta 3000');
});