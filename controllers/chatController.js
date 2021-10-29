const { getAll } = require('../models/chatModel');

const getAllMsg = async (_req, res) => {
  const msgs = await getAll();

  const history = msgs.map(({ message, nickname, timestamp }) =>
  `${timestamp} - ${nickname}: ${message}`);
  
  res.status(200).render('webChat', { history });
};

module.exports = {
  getAllMsg,
};
