const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 8000;
const users = {};
//  const path = require("path");
// For serving static files
 app.use("/static", express.static("static"));
// Set the template engine as pug
// app.set("view engine", "pug");
// Set the views directory
//  app.set("views", path.join(__dirname, "../views"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});


io.on("connection", (socket) => {
  socket.on("new-user-joined", (Name) => {
    console.log("new user", Name);
    users[socket.id] = Name;
    socket.broadcast.emit("user-joined", Name);
  });
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
     message,
      Name: users[socket.id],
    });
  });
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
    socket.on("send-typing", (typingg, scroll) => {
      socket.broadcast.emit("type-receive", {
       typingg,
          Name: users[socket.id],
        }
     );
    
   });
 
 
 
 });


server.listen(port, () => {
  console.log('listening on *:8000');
});