// Faça seu código aqui
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const messageModels = require('./models/messageModels');
const controllersMessage = require('./controllers/messageControllers');

const date = new Date();

const time = date.toLocaleTimeString();
const newDate = date.toLocaleDateString().replace(/\//g, '-');
const getTime = time.split(':');
const pmOrAm = getTime[0] >= '12' ? 'PM' : 'AM';
const fullDate = `${newDate} ${time} ${pmOrAm}`;

const PORT = process.env.PORT || 3000;

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '.', 'views'));

io.on('connection', (socket) => {
    console.log(`O cliente ${socket.id} se conectou`);

    socket.on('message', async ({ chatMessage, nickname }) => {
      const formatMessage = `${fullDate} - ${nickname}: ${chatMessage}`;
            io.emit('message', formatMessage);
            await messageModels.createNewMessageDocument(chatMessage, nickname, fullDate);
    });
});

app.get('/', controllersMessage.getAll);

http.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));