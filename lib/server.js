//Socket.io
var socketio = require('socket.io');

exports.listen = function(server, data){
	var io = socketio.listen(server);
	io.sockets.on('connection', function (client) {
    'use strict';
	});

};