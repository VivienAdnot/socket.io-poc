var http = require('http');
var fileSystem = require('fs');
var socketIO = require('socket.io');

var server = http.createServer(function(req, res) {
    fileSystem.readFile("./index.html", "utf-8", function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

var io = socketIO.listen(server);

io.sockets.on('connection', function (socket) {
    socket.emit('message-fromserver', 'Vous êtes bien connecté !');
    socket.broadcast.emit('message-fromserver', 'Un autre client vient de se connecter !');

    socket.on('petit_nouveau', function(pseudo) {
        socket.pseudo = pseudo; //hack, on bind une propriété dynamique à l'objet
    });

    // Quand le serveur reçoit un signal de type "message" du client
    socket.on('message-toserver', function (message) {
        console.log(socket.pseudo + ' me parle ! Il me dit : ' + message);
    });
});

server.listen(8050);
