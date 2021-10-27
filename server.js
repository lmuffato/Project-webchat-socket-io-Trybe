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

io.on('connection', (socket) => {
    socket.on('message', (message) => {        
        io.emit('message', normalizeMessage(message));
    });
});

app.get('/', (_req, res) => {
    res.sendFile(join(__dirname, '/index.htm'));
});

server.listen(3000, () => {
    console.log('tudo correu bem');
});