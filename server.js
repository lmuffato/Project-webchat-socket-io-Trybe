// Faça seu código aqui
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const date = new Date();

const time = date.toLocaleTimeString();
const newDate = date.toLocaleDateString().replace(/\//g, '-');
const getTime = time.split(':');
const pmOrAm = getTime[0] >= '12' ? 'PM' : 'AM';
const fullDate = `${newDate} ${time} ${pmOrAm}`;

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http);

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '.', 'views'));

io.on('connection', (socket) => {
    console.log(`O cliente ${socket.id} se conectou`);

    socket.on('message', ({ chatMessage, nickname }) => {
      const formatMessage = `${fullDate} - ${nickname}: ${chatMessage}`;
        io.emit('message', formatMessage);
    });
});

app.get('/', (req, res) => res.render('home'));

http.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));