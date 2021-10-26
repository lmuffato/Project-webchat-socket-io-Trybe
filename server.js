const express = require('express');
const moment = require('moment');

const app = express();
const http = require('http').createServer(app);

moment.locale();

const port = 3000;

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.static(`${__dirname}/public`));

const io = require('socket.io')(http, {
  cors: {
    origi: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const data = moment().format('DD-MM-YYYY hh:mm:ss A');
    io.emit('message', `${data} - ${nickname}: ${chatMessage}`);
  });
});

app.get('/', (req, res) => res.render('index'));

http.listen(port, () => console.log('Ouvindo na porta 3000'));
