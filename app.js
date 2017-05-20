var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};
var name;

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {
  client.on('chatMessage', function(msg) {
    users[client.id] = name;
    client.broadcast.emit(name + "Has connected");
    io.emit('chatMessage', msg);
  });
}); 
