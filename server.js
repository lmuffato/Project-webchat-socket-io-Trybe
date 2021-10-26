const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  }
})

app.use(cors());

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
})
