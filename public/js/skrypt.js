/*jshint node: true, browser: true, jquery: true */
/*global io: false */
$(document).ready(function () {
	'use strict';

	//hiding elements
	// $('#login-link').hide();
	// $('#logout-link').hide();
	// $('#login-panel').hide();
	// $('#loggedin-panel').hide();
	GUI.hideLogin();
	GUI.hideAll();
	//---

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
			loginCallback();
		}
	});

	//actions if user is loggedin
	var loggedinCallback = function (user){
		//object 'user' contains all data about current loggedin user

		console.log("user.id: " + user.id);
		//fill loggedin panel with data
		GUIutils.getNormalFbPic(user.id, 'profile-normal-pic');
		// getLargeFbPic(user.id, 'fbLargePic');
		 $('#profile-display-name').text(user.profile.displayName);
		 //hide & show elements
	 	$('#login-link').hide();
		$('#logout-link').show();
		$('#login-panel').hide();
		$('#loggedin-panel').show();

		//user-settings button click
		$('#settings-button').click(function (){
			GUI.userSettingsButtonClick(user);
		});	

		$('#user-settings-cancel-button').click(function (){
			GUI.userSettingsCancelClick(user);
		});

		$('#user-settings-save-button').click(function (){
			var newuser = GUI.userSettingsSaveClick(user);
			console.log(newuser);
		});

		//sockets.io
		var socket = io.connect('http://localhost:3000');

		console.log('connecting…');

		socket.on('connect', function () {
			console.log('Połączony!');
		});
	};

	//actions if user is not loggedin
	var loginCallback = function (){
		//show content to login with fb
		$('#login-link').show();
		$('#login-panel').show();
	};
});
