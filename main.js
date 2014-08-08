var express = require('express')
var app = express();

app.configure(function(){
  app.use('/', express.static(__dirname + '/' + Settings.clientDirectory));
});

var server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(Settings.serverPort);

io.sockets.on('connection', function (socket) { // connection is initialized
  console.log("connected"); 
  
  socket.emit('news', {'hello': 'client'}); // talk to client
  
  socket.on('cmd', function (data) { // received "cmd" from client
    console.log(data);
  });
};