const socket = window.io('http://localhost:3000');

    socket.on('message', (notification) => {
      const li = document.createElement('li');
      const liText = document.createTextNode(notification);
      li.appendChild(liText);
      document.getElementById('message').appendChild(li);
    });
