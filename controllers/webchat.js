const models = require('../models/webchat');

const getMessages = async (_req, res) => {
        const messages = await models.getMessages(); 
        return res.render('webchat', messages);
};

module.exports = { getMessages };