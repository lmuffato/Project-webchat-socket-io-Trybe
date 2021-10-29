const getAll = async (_req, res) => {
  res.status(200).render('index');
};

module.exports = { getAll };
