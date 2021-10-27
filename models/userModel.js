let ONLINEUSERS = [];

const create = ({ nickname, socketId }) => {
  let id;
  if (ONLINEUSERS.length === 0) {
    id = 1;
  } else {
    const lastId = ONLINEUSERS[ONLINEUSERS.length - 1].id;
    id = lastId + 1;
  }
  const clientObj = { id, nickname, socketId };

  ONLINEUSERS.push(clientObj);

  return { id };
};

const getAll = () => ONLINEUSERS;

const update = (id, { nickname }) => {
  const newArray = ONLINEUSERS.map((user) => {
    if (user.id === parseInt(id, 0)) {
      const newUser = { id: parseInt(id, 0), nickname, socketId: user.socketId };
      return newUser;
    }
     return user;
  });
  ONLINEUSERS = newArray;
  return 'ok';
};

const deleteById = async (socketId) => {
  const newArray = ONLINEUSERS.filter((user) => user.socketId !== `${socketId}`);
  ONLINEUSERS = newArray;
  return 'ok';
};

module.exports = {
  create,
  getAll,
  update,
  deleteById,
};