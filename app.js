const express = require('express');
const randomString = require('randomstring');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (_req, res) => {
  const randomNickname = randomString.generate({
    length: 16,
    charset: 'alphanumeric',
  });

  res.status(200).render('index', {
    randomNickname,
  });
});

module.exports = app;
