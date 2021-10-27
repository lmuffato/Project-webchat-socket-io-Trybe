const userModel = require('../models/userModel');

const renderPage = async (_req, res) => {
  const random1 = (Math.random() * 10).toFixed(0);
  const random2 = (Math.random() * 10).toFixed(0);
  const username = `usuarioAnonimo${random1}${random2}`;
  const userID = await userModel.create({ nickname: username });
  res.status(200).render('interface', { username, userID: userID.id });
};

module.exports = {
  renderPage,
};