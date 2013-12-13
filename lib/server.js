//Socket.io
var socketio = require('socket.io');

exports.listen = function(server, User, Data){
	var io = socketio.listen(server);
	io.sockets.on('connection', function (client) {
		'use strict';

			//updateUser
			client.on('updateUser', function (newuser){
				Data.updateUser(newuser, function (result) {
					if(result === 1){
						Data.findUser(newuser.id, function (data) {
							client.emit('updatedUser', data);
						});
					}
				});
			});

			//addList
			client.on('addList', function (newlist) {
				Data.addList(newlist, function (item) {
					if(item && item !== null){
						console.log(item);
						Data.findAllLists(newlist.fbid, function (items){
							client.emit('addedList', items);
						});
					}
				});
			});

			//rmList
			client.on('rmList', function (data) {
				Data.removeList(data.id, function (item) {
					console.log(item);
					Data.findAllLists(data.fbid, function (items){
						client.emit('rmedList', items);
					});
				});
			});

			//editList
			client.on('editList', function (data) {
				Data.updateList(data, function (result) {
					console.log(result);
					if(result === 1){
						Data.findAllLists(data.fbid, function (items){
							client.emit('editedList', items);
						});
					}
				});
			});

			//addTask
			client.on('addTask', function (newtask) {
				Data.addTask(newtask, function (item) {
					if(item && item !== null){
						console.log(item);
						Data.findAllTasks(newtask.listid, function (items){
							Data.findList(newtask.listid, function (list){
								client.emit('addedTask', {"list": list, "tasks": items});
							});
						});
					}
				});
			});

	});

};