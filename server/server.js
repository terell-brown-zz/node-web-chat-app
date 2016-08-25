var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var numChatters = 0;

server.listen(3000, function(err) {
  if (err)
    console.log("Error connecting to server");
  else
    console.log("Connection to server established.");
});

io.on('connection', function(socket) {
	numChatters ++;
  console.log("Another user joined that chat. " + numChatters + " total chatters.");
  io.emit("/message", "Thanks for joining the chat. There are " + numChatters + " other people chatting as well.");

    socket.on('/message', function(data) {
      console.log(data.content);
      io.emit('/message', data);
    });

    socket.on('disconnect', function() {
        numChatters --;
        console.log("Someone left the chat and now there are " + numChatters 
            +  " total chatters.");
	});
});

