const rescue = require('express-rescue');

const HTTP_OK_STATUS = 200;
const { getAll } = require('../models/messagesModel');

const getAllMessages = rescue(async (_req, res) => {
  const messages = await getAll();

  res.status(HTTP_OK_STATUS).render('client', { messages });
});

module.exports = { getAllMessages };
