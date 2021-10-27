const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URL = process.env.DB_URL;
const { PORT = 3000 } = process.env;
const { DB_NAME = 'webchat' } = process.env;

const DB_URL = MONGO_URL || `mongodb://localhost:${PORT}/${DB_NAME}`;

let schema = null;

async function connection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient.connect(DB_URL, {
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
