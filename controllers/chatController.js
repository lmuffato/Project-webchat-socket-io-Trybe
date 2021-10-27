// const { getJokes } = require("../models/joke");

const renderPage = (_req, res) => {
  const random1 = (Math.random() * 10).toFixed(0);
  const random2 = (Math.random() * 10).toFixed(0);
  const username = `usuarioAnonimo${random1}${random2}`;
  res.status(200).render('interface', { username });
};

module.exports = {
  renderPage,
};