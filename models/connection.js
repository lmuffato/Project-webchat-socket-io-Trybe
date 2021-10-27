const { MongoClient } = require('mongodb');
require('dotenv').config();

const Options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const connection = () => (
  db
  ? Promise.resolve(db)
  : MongoClient.connect(process.env.DB_URL, Options)
  .then((conn) => {
    db = conn.db(process.env.DB_NAME);
    return db;
  })
);

module.exports = connection;
