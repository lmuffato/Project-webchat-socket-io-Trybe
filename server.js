const express = require('express');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: '',
    methods: ['GET', 'POST'],
  },
});

const corsSettings = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsSettings));

app.get('/', async (req, res) => {
  const chat = '';
});
