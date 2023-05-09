const WebSocketServer = require('ws').Server;
const server = new WebSocketServer({ port: 3000 });

server.on('connection', (socket) => {
  console.log('WebSocket is connected');

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    socket.send(`Hello Client: ${message}`);
  });
});
