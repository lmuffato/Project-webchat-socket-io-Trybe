const express = require('express');
const path = require('path');

const app = express();

const server = require('http').createServer(app);

const PORT = 3000;

app.use(express.static('./public'));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public/chat.html'));
});

server.listen(PORT, () => console.log(`Server WebChat Online na porta ${PORT}`)); 