const Model = require('../models/ChatModel');

const getAllMessages = async (req, res) => {
  const messages = await Model.getAllMessages();
  try {
    return res.render('webchat', { messages });
  } catch (err) {
    console.error(err);
    return res.status(500).send('erro');
  }
};

module.exports = {
  getAllMessages,
};
