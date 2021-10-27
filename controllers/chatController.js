// const userModel = require('../models/userModel');
const chatModel = require('../models/chatModel');

const renderPage = async (_req, res) => {
  // const random1 = (Math.random() * 9).toFixed(0);
  // const random2 = (Math.random() * 9).toFixed(0);
  // const username = `usuarioAnonimo${random1}${random2}`;
  // const userID = await userModel.create({ nickname: username });
  const messages = await chatModel.getAll();
  res.status(200).render('interface', { messages });
  // username, userID: userID.id,
};

module.exports = {
  renderPage,
};