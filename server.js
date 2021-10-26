const express = require('express');
const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);

app.get('/test', (_req, res) => {
  res.status(200).send('OK');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
