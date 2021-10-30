const msgs = require('./msgs');
const users = require('./users');

module.exports = (io) => {
  msgs(io);
  users(io);
};
