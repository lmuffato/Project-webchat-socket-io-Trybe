const messages = require('../models/messages');

const listAuthors = async (req, res) => {
  const authors = await messages.getAllMessages();

  res.status(200).render('authors/index', { authors });
};

module.exports = {
 listAuthors,
};