const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const getRandomData = () => {
  const dataArray = [];
  for (let x = 1; x <= 20; x++) {
    dataArray.push({ x, y: Math.random() * 5 });
  }
  return dataArray;
};

io.on('connection', (socket) => {
  console.log('A user connected');

  // Emit random data array every 5 seconds
  const interval = setInterval(() => {
    const randomData = getRandomData();
    socket.emit('randomData', randomData);
  }, 10000);

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
