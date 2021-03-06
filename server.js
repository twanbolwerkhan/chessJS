// Based off of Shawn Van Every's Live Web
// http://itp.nyu.edu/~sve204/liveweb_fall2013/week3.html
var Chess = require('./chess.js-master/chess').Chess;
var chess = new Chess();


// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
    // We are given a websocket object in our function
    function (socket) {

        console.log("We have a new client: " + socket.id);
        io.sockets.emit('board', chess.fen());
        // When this user emits, client side: socket.emit('otherevent',some data);
        socket.on('move',
            function (data) {

                // Data comes in as whatever was sent, including objects
                console.log("Received: 'move' from: " + data.from + " to: " + data.to);
                var move = { from: data.from, to: data.to };
                if (data.from != undefined && data.to != undefined) {
                    var output = chess.move(move);
                    console.log(output);
                }
                // Send it to all other clients
                // socket.broadcast.emit('board', chess.fen());

                // This is a way to send to everyone including sender
                io.sockets.emit('board', chess.fen());
                io.sockets.emit('output',output);
            }
        );
        socket.on('restart',function(){
            chess = new Chess();
        });

        socket.on('disconnect', function () {
            console.log("Client has disconnected");
        });
    }
);