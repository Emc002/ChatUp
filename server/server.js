const express = require('express');
const http = require('http');
let app = express();
const socketIO = require('socket.io');

// Setting path
const path = require('path');
const publicPath = path.join(__dirname, "/../public");

// Create Server
let server = http.createServer(app);

let io = socketIO(server);

io.on('connection', (socket) => {
  console.log("A new user just connected")

  socket.on('disconnect', () => {
    console.log('A User was Disconnected')
  } )
});



const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

server.listen(3000, () => {
  console.log(`Server is listening on PORT : ${port}`)
});
