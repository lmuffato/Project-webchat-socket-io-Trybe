const connection = require('./connection');

let users = [];

const addMessage = async (msgData) => {
    const db = await connection();
    await db.collection('messages').insertOne({ ...msgData });
};

const getMessages = async () => {
    const db = await connection();
    return db.collection('messages').find().toArray();
};

const addUser = (id, nickname) => {
    users.push({ id, nickname });
    return users;
};

const getUsers = () => users;

const deleteUser = (id) => {
   users = users.filter((user) => id !== user.id);
};

const updateNickname = (id, nickname) => {
    const updatedUsers = users.map((user) => {
        if (user.id === id) {
            return ({ id, nickname });
        }
        return user;
    });
    users = updatedUsers;
    return updatedUsers;
};

module.exports = { addMessage, getMessages, addUser, deleteUser, getUsers, updateNickname };