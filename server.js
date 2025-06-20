const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { connectDB } = require('./config/db');

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

global.io = io;

connectDB().then(() => {
  server.listen(process.env.PORT || 5000, () =>
    console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`)
  );
});
