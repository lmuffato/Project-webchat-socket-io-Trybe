const getAllMsg = (_req, res) => {
  res.status(200).render('webChat');
};

module.exports = {
  getAllMsg,
};
