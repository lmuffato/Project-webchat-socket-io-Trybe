const express = require('express');
const { join } = require('path');

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
const normalizeMessage = require('./services/normalizeMessage');
const { getMessages, insertMessage } = require('./controllers');

io.on('connection', async (socket) => {
    const pastMessages = await getMessages();
    io.emit('onlineUsers');    
    io.emit('pastMessages', pastMessages);
    socket.on('message', async (message) => {        
        const newMessage = normalizeMessage(message);
        await insertMessage(newMessage);
        io.emit('message', newMessage);
    });    
    socket.on('namesList', (name) => {
        const obj = { name, id: socket.id };        
        io.emit('namesList', obj);
    });
    socket.on('disconnect', () => io.emit('destroy', socket.id));
});

app.get('/', (_req, res) => {
    res.sendFile(join(__dirname, '/index.htm'));
});

server.listen(3000, () => {
    console.log('tudo correu bem');
});