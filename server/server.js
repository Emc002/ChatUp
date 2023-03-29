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

  socket.emit('newMessage', {
    from: 'Admin',
    text: "Welcome to the CHATUP",
    createdAt: new Date().getTime()
  })

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User Joined',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  });

  socket.on('disconnect', () => {
    console.log('A User was Disconnected')
  })
});



const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

server.listen(3000, () => {
  console.log(`Server is listening on PORT : ${port}`)
});
