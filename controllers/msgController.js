const modelMsg = require('../models/msgModel');

const getAllMsg = async (_req, res) => {
  const messages = await modelMsg.getAllMessages();

  return res.status(200).render('./index', { messages });
};

module.exports = {
  getAllMsg,
};
