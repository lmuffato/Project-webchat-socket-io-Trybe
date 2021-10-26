// const { getJokes } = require("../models/joke");

const renderPage = (_req, res) => {
  const random = Math.round(Math.random() * 100, 1);
  const username = `usuário ${random}`;
  res.status(200).render('interface', { username });
};

module.exports = {
  renderPage,
};