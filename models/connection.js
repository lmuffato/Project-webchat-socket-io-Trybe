const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URL = process.env.DB_URL;
const { DB_NAME = 'webchat' } = process.env;

let schema = null;

async function connection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = connection;
