const insertOne = require('../models/insertOne');

const insertMessage = async (message) => {
    await insertOne({ message });
};

module.exports = insertMessage;