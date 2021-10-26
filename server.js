// Faça seu código aqui
const express = require('express');
const webchatController = require('./controllers/webchat');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

const PORT = process.env.PORT || 3000;

app.get('/webchat', webchatController.getAll);

app.listen(PORT, () => console.log(`API escutando na porta ${PORT}`));
