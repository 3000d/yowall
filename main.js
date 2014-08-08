var express = require('express');
var app = express();

var request = require('request');




var server = require('http').createServer(app).listen(3000);
  var io = require('socket.io').listen(server);

app.use('/',express.static(__dirname + '/public_html'));


app.get('/yo', function(req, resp){
  var username=req.query.username;
  var options = {
    host:'api.justyo.co',
    path:"/yo",
    method:"post"
  };
  request.post(
    'http://api.justyo.co/yo',
    {form:
      {
        api_token:process.env.YO_API_KEY,
        username: username// 'LABS3KD'
      }
    },
    function(error,response,body){
      resp.send(body.result);
      if(! error && response.statusCode == 200){

      }
    }
  );
  console.log('trying to yo '+username);
//  resp.send('yo');
});

app.get('/receiveyo',function(req,resp){
  var username = req.query.username;

  resp.send('ok');
});

// server.listen(3000);

io.sockets.on('connection', function (socket) { // connection is initialized
  console.log("connected"); 
  
  socket.emit('news', {'hello': 'client'}); // talk to client
  
  socket.on('cmd', function (data) { // received "cmd" from client
    console.log(data);
  });

});
