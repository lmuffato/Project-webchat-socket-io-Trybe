const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

require('./controllers/webchat')(io);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (_req, res) => {
  res.status(201).render('chat');
});

http.listen(PORT, () => console.log(`API escutando na porta ${PORT}`));
