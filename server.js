// Faça seu código aqui
const express = require('express');
const bodyparser = require('body-parser');

const PORT = 3000;

const app = express();
app.use(bodyparser.json());

app.use('/assets', express.static('./assets/javascripts')); // indica a pasta onde se encontra client.js
app.use('/assets', express.static('./assets/css')); // indica a pasta onde se encontra o css
// 1: config servidor http
const server = require('http').createServer(app); // instanciando o servidor http
const io = require('socket.io')(server);
// modificaçao:03:22S
// 2 configuração da views(parte do front end)
app.set('view engine', 'ejs'); // informa que engine?? será ejs
app.set('views', './views'); // onde nossa views(index.ejs) ficarao armazenada será a pasta de frontend

app.get('/', (req, res) => { // 2.1 indicar qual arquivo(ejs)da pasta views deve ser carregado ao acessar o endpoint
    res.render('index');
  });
  
  const arrayOfMessages = [];
  
  io.on('connection', (socket) => { // conectando um socket(usuario/guiado do naveg)
    console.log(`novo usuário ${socket.id}  conectado ao socket.io`);
    socket.emit('previewsMassage', arrayOfMessages);
    socket.on('message', (objectMessage) => {
      arrayOfMessages.push(objectMessage);
      socket.broadcast.emit('allMessage', objectMessage);
    });
  });
  
// 3 configurando uma porta unica para front e back
server.listen(PORT, () => console.log('escutando a porta:', PORT));