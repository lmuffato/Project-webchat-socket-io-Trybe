const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

app.use(bodyParser.json());
app.use(cors());

io.on('connection', () => { // socket
  console.log('Alguen se conectou');
});

// app.get('/teste', (req, res) => {
//   res.sendFile(`${__dirname}/index.html`);
// });

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});