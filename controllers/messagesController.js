const messagesController = async (_req, res) => (
  res.status(200).render('index', { messages: [] })
);

module.exports = { messagesController };