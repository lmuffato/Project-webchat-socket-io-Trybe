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
    io.emit('pastMessages', pastMessages);
    socket.on('message', async (message) => {        
        const newMessage = normalizeMessage(message);
        await insertMessage(newMessage);
        io.emit('message', newMessage);
    });
});

app.get('/', (_req, res) => {
    res.sendFile(join(__dirname, '/index.htm'));
});

server.listen(3000, () => {
    console.log('tudo correu bem');
});