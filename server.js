const express = require('express');
const path = require('path');
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

require('./sockets/chatSocket')(io);

const chatService = require('./services/chatService');

// const corsSettings = {
//   origin: 'http://localhost:3000',
// };

app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.set('views', './views');

// renderização de todas as msgs salvas na collection messages, usando SSR - Server Side Rendering
app.get('/', async (_req, res) => {
  const chat = await chatService.getAllMessages();
  res.render('chat', { chat });
});

http.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));
