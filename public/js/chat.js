const socket = window.io();

window.onbeforeunload = () => {
  socket.disconnect();
};

const apendOnlineUsers = (users) => {
  const listOnlineUsers = document.getElementById('online-users');
  listOnlineUsers.innerHTML = '';
  users.forEach(({ nickname }) => {
    const listItem = document.createElement('li');

    listItem.setAttribute('id', nickname);
    listItem.setAttribute('data-testid', 'online-user');

    listItem.innerText = nickname;

    listOnlineUsers.appendChild(listItem);
  });
};

socket.on('online-users', (users) => {
  apendOnlineUsers(users);
});
