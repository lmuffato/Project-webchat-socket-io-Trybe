// const user = require('../models/userModel');

const renderWebchat = async (_req, res) => {
  res.status(200).render('index');
};

module.exports = {
  renderWebchat,
};
