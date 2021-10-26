const express = require('express');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: '',
    methods: ['GET', 'POST'],
  },
});

require('./sockets/chatSocket')(io);

const corsSettings = {
  origin: 'http://localhost:3000',
};

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cors(corsSettings));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', async (req, res) => {
  const chat = '';
});

app.use('/', (_req, res) => res.render('chat.ejs'));

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));