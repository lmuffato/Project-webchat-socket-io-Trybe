const express = require('express');
const randomString = require('randomstring');
const Message = require('./models/Message');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', async (_req, res) => {
  const randomNickname = randomString.generate({
    length: 16,
    charset: 'alphanumeric',
  });

  const messages = await Message.getAll();

  res.status(200).render('index', {
    randomNickname,
    messages,
  });
});

module.exports = app;
