const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);

const PORT = 3000;

app.use(cors());

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));