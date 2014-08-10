// check environment variables are properly set
if(process.env.YO_API_KEY == undefined || process.env.YO_SECRET == undefined){
  throw new Error('Environment variables YO_API_KEY or YO_SECRET are undefined');
  return;
}
var express = require('express');
var app = express();
var request = require('request');




var server = require('http').createServer(app).listen(3000);
  var io = require('socket.io').listen(server);

app.use('/',express.static(__dirname + '/public_html'));

/**
 * Uncomment if you want to be able to send yo from the web
 * CAUTION: this is HIGHLY insecure as anyone with the url could post yos on your behalf. Use for test only
 */
/*
// send yo route
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
        username: username
      }
    },
    function(error,response,body){
      resp.send(body.result);
      if(! error && response.statusCode == 200){

      }
    }
  );
  console.log('trying to yo '+username);

});
*/


/**
 * callback route
 */
app.get('/receiveyo',function(req,resp){
  // the secret must be set in the YO API dashbord as a parameter of your callback url
  // you must also set up an environment variable named YO_SECRET with the same string
  // this security trick has to be improved. Any suggestion welcome
  var secret = req.query.secret;
  if(secret==undefined || secret != process.env.YO_SECRET){
    resp.send(401, 'unauthorized');
  }else{
    var username = req.query.username;
    console.log('yo from '+username);
    io.sockets.emit('yo',{username:username});
    resp.send('ok');
  }
});


io.sockets.on('connection', function (socket) { // connection is initialized
  console.log("connected"); 
});
