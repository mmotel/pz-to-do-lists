/*jshint node: true, browser: true, jquery: true */
/*global io: false */
$(document).ready(function () {
	'use strict';

	//hiding elements
	GUI.hideLogin();
	GUI.hideAll();
	//---

	//starting front-end
	$.getJSON('http://localhost:3000/getLogin', function(data){ 
		console.log("data [ " + data + " ]"); 
		if(data !== null) {
			console.log('####@@@@loggedin!');
			//actions if user is loggedin
			loggedinCallback(data); 
		}
		else {
			console.log('%%%%&&&&NOT loggedin!');
			//actions if user is not loggedin
			GUI.showNotLoggedin();
		}
	});

	//actions if user is loggedin
	var loggedinCallback = function (user){
		//object 'user' contains all data about current loggedin user
		GUI.fillLoginPanel(user);
		// hide & show elements
		GUI.showLoggedin();

		//sockets.io
		var socket = io.connect('http://localhost:3000');

		console.log('connecting…');

		socket.on('connect', function () {
			console.log('Połączony!');
		});
		//Update user
		socket.on('updatedUser', function (data) {
			console.log(data);
			user = data;
			GUI.userSettingsFill(user);
		});
		//---


		//user-settings button click

		$('#settings-button').click(function (){
			GUI.userSettingsButtonClick(user);
		});	

		$('#user-settings-delete-button').click(function (){
			$('#user-delete-account-modal').modal('show');
		});

		$('#user-settings-cancel-button').click(function (){
			GUI.userSettingsFill(user);
		});

		$('#user-settings-save-button').click(function (){
			var newuser = GUI.userSettingsSaveClick(user);
			console.log(newuser);
			socket.emit('updateUser', newuser);
		});
	};

});
