const messageModels = require('../models/messageModels');

const getAll = async (req, res) => {
   const allMessages = await messageModels.getAll();
   res.status(200).render('home', { allMessages });
};

module.exports = {
    getAll,
};