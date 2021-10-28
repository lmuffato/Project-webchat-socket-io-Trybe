const database = require('./connection');
/**
 * @typedef {object} message
 * @property {string} message
 * @property {string} nickname
 * @property {string} timestamp
 */

/** @returns {Promise<message[]>} */
exports.getAll = () => 
  database()
  .then((db) =>
    db
    .collection('messages')
    .find({})
    .toArray());
/**
 * 
 * @param {message} message 
 * @returns {Promise<import('mongodb').InsertOneWriteOpResult<message>>}
 */
exports.create = (message) =>
  database()
  .then((db) =>
  db.collection('messages')
  .insertOne(message));
