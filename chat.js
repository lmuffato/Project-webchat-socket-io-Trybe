// Front connection

/* const socket = window.io('http://localhost:3000');

const createLi = (notification) => {
  const li = document.createElement('li');
  const liText = document.createTextNode(notification);
  li.appendChild(liText);
  document.getElementById('news').appendChild(li);
};

socket.on('notification', createLi);

socket.on('loadNotifications', (notifications) => {
  notifications.forEach(notification => {
    createLi(notification);
  });
});
 */