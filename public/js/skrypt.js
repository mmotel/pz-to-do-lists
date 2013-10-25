/*jshint node: true, browser: true, jquery: true */
/*global io: false */
$(document).ready(function () {
	'use strict';

	var getNormalFbPic = function (fbid, picElementId) {

		$.getJSON('http://graph.facebook.com/'+fbid+'/picture?type=normal&redirect=false', function(pic){
			console.log(pic.data.url);
			$('#'+picElementId).attr('src', pic.data.url);
		});

	};

	var getLargeFbPic = function (fbid, picElementId) {

		$.getJSON('http://graph.facebook.com/'+fbid+'/picture?type=large&redirect=false', function(pic){
			console.log(pic.data.url);
			$('#'+picElementId).attr('src', pic.data.url);
		});

	};

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

		// getNormalFbPic(user.id, 'fbNormalPic');
		// getLargeFbPic(user.id, 'fbLargePic');

		var socket = io.connect('http://localhost:3000');

		console.log('connecting…');

		socket.on('connect', function () {
			console.log('Połączony!');
		});
	};

	//actions if user is not loggedin
	var loginCallback = function (){
		//show content to login with fb
	};
});
