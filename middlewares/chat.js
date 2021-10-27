const faker = require('faker/locale/pt_BR');

const getRandomName = (req, res, next) => {
  const nickname = faker.name.findName();
  res.status(200).render('index.ejs', { nickname });
  next();
};

module.exports = {
  getRandomName,
};