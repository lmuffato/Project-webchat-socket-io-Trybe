const webchatModel = require('../models/webchat');

const getAll = async (_req, res) => {
  const result = await webchatModel.getAll();
  res.status(200).render('../views/chat.ejs', { result });
};

module.exports = {
  getAll,
};
