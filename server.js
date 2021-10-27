const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express();

const http = require('http').createServer(app);

// const webchatController = require('./controllers/webchat');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/webchat', (_req, res) => {
  res.render('chat');
});

http.listen(PORT, () => console.log(`API escutando na porta ${PORT}`));
