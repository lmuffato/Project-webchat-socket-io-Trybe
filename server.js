const express = require('express');
const cors = require('cors');
const moment = require('moment');

const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'https://localhost:3000',
    method: ['GET, POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const timeStamp = moment().format('DD-MM-YYYY HH:mm:ss A');
    io.emit('message', `${timeStamp} - ${nickname}: ${chatMessage}`);
  });
});

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/', (_req, res) => { res.status(200).render('webChat'); });

http.listen(PORT, () => console.log(`Passando na porta ${PORT}`));