const express = require('express');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (_req, res) => {
  res.status(200).render('test-client');
});

module.exports = app;
