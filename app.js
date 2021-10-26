const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/test', (_req, res) => {
  res.status(200).render('test-client');
});

module.exports = app;