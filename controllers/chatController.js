// const user = require('../models/userModel');

const firstName = [
  "Joseph",
  "Joãozin",
  "Antônio",
  "Francisco",
  "Carlos",
  "Paulon",
  "Pedron",
  "Luccas",
  "Luizin",
  "Marcos",
  "Mariah",
  "Adriana",
  "Brunao",
  "Juliana",
  "Márcia",
  "Fernanda",
  "Patrícia",
  "Alinee",
  "Sandra",
  "Camila",
];

const lastName = [
  "Duboporgakh",
  "Ironfistall",
  "Lugurhandd",
  "Bradburgon",
  "Arsgardian",
  "Azulkgamph",
  "Lurthbumph",
  "Fortprider",
  "Firacoding",
  "Helvetican",
  "Mizanganck",
  "Zefeythall"
];

const generateNickname = () => {
  nickFirst = firstName[Math.floor(Math.random() * firstName.length)];
  nickLast = lastName[Math.floor(Math.random() * lastName.length)];
  nickname = `${nickFirst}_${nickLast}`;
  return nickname.slice(0, 16);
}

const renderWebchat = async (_req, res) => {
  const nickname = generateNickname();
  res.status(200).render('index', {
    nickname: nickname,
  });
};

const renderUserName = (req, res) => {
  const nickname = "Pessoa";
  res.render('index', {
    nickname: nickname,
  })
}

// const getUsers = async (req, res) => {
//   res.status(200).render('users');
// }

module.exports = {
  renderWebchat,
  renderUserName,
  // getUsers,
};
