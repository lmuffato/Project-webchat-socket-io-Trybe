const express = require('express');
const http = require('http');
require('dotenv').config();

// criando serviço
const app = express();
const server = http.createServer(app);

// setando a view eng
app.set('view engine', 'ejs');
app.set('views', './views');

// declarando rota
app.get('/', (_req, res) => res.render('index'));

// criando conexão
const { env: { PORT } } = process;
const myPort = PORT || 3000;
server.listen(myPort, () => {
  console.log(`ouvindo na porta ${myPort}`);
});
