const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const connection = require('../connection');

const app = express();
app.use(bodyParser.json());

const TABLE_NAME = 'messages'; // Tabela do mongodb

// Retorna todas as mensagens
const getAll = async () => {
  const db = await connection();
  const data = await db.collection(TABLE_NAME).find({}).toArray();
  return data;
};

// Retorna uma mensagem pelo;
const getById = async (id) => {
  const db = await connection();
  return db.collection(TABLE_NAME).findOne(ObjectId(id));
};

// Adiciona uma nova mensagem
const create = async (obj) => {
  const { nickname, message, timestamp } = obj;
  const db = await connection();
  await db.collection(TABLE_NAME)
    .insertOne({ nickname, message, timestamp });
};

module.exports = {
  getAll,
  getById,
  create,
};
