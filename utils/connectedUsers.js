module.exports = (() => {
  /** @typedef {{original: string, current: string}} user */
  /** @type {user[]} */
  let users = [];
  return {
    getAll: () => users.map((user) => user.current),
    /** @param {string} username  */
    add: (username) => {
       users = users
      .map((user) => user.original)
      .includes(username) ? users : [...users, { original: username, current: username }];
    },
    /** @param {string} username  */
    remove: (username) => {
      users = users.filter((name) => name.original !== username); 
    },
    /** @param {string} oldName @param {string} newName */
    change: (oldName, newName) => {
      const index = users.findIndex((user) => user.current === oldName);
      users[index] = { original: users[index].original, current: newName };
    },
  };
})();
