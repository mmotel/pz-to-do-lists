//Socket.io
var socketio = require('socket.io');

exports.listen = function(server, User, Data){
	var io = socketio.listen(server);
	io.sockets.on('connection', function (client) {
		'use strict';


			//updateUser
			client.on('updateUser', function (newuser){
				Data.updateUser(newuser, function (item) {
					if(item === 1){
						Data.findUser(newuser.id, function (data) {
							client.emit('updatedUser', data);
						});
					}
				});
			});


	});

};