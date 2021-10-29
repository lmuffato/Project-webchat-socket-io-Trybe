const moment = require('moment');

const generateFormatedDate = () => moment().format('DD-MM-YYYY HH:mm:ss');

module.exports = generateFormatedDate;
