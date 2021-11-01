const btnOnlineUsers = document.querySelector('.btnOnlineUsers');
const btnHideOnlineUsers = document.querySelector('.btnHideOnlineUsers');
const onlineUsersAside = document.querySelector('.online-users');
const usersContainer = document.querySelector('.online-users .users');

btnOnlineUsers.addEventListener('click', () => {
  if (onlineUsersAside.classList.contains('hide')) {
    onlineUsersAside.classList.replace('hide', 'show');
  } else {
    onlineUsersAside.classList.add('show');
  }
});

btnHideOnlineUsers.addEventListener('click', () => {
  onlineUsersAside.classList.replace('show', 'hide');
});

function createOnlineUserElement(nick) {
  const onlineUser = document.createElement('div');
  onlineUser.className = 'online-user';
  onlineUser.setAttribute('data-testid', 'online-user');
  const circle = document.createElement('i');
  circle.className = 'fas fa-circle';
  onlineUser.appendChild(circle);
  onlineUser.append(nick);
  return onlineUser;
}

function appendUser() {
  const { socket } = window;
  socket.on('show-users', (users) => {
    usersContainer.innerHTML = '';
    const currentUser = users.find((user) => user.id === socket.id);
    if (currentUser) {
      const onlineCurrentUser = createOnlineUserElement(currentUser.nickname);
      onlineCurrentUser.classList.add('current-user');
      usersContainer.appendChild(onlineCurrentUser);
    }
    
    users.forEach((user) => {
      if (user.id !== socket.id) {
        const onlineUser = createOnlineUserElement(user.nickname);
        usersContainer.appendChild(onlineUser);
      }
    });
  });
}

appendUser();
