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
			loggedinCallback(data.user, data.lists); 
		}
		else {
			console.log('%%%%&&&&NOT loggedin!');
			//actions if user is not loggedin
			GUI.showNotLoggedin();
		}
	});

	//actions if user is loggedin
	var loggedinCallback = function (user, lists){
		//object 'user' contains all data about current loggedin user

		console.log(lists);
		//setLists
		GUI.fillUserListsSmall(lists);

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
			if(data.id === user.id){
				console.log(data);
				user = data;
				GUI.fillUserForm(user);
			}
		});
		//Add list
		socket.on('addedList', function (data) {
			if(data.fbid === user.id){
				//add new list into lists' tabels
				console.log(data);
				lists.push(data);
				GUI.fillUserListsSmall(lists);
			}
		});
		//Rm list
		socket.on('rmedList', function (data) {
			lists = data;
			GUI.fillUserListsSmall(lists);
			GUI.allListButtonClick(lists);
		});
		//Edit list
		socket.on('editedList', function (data) {
			lists = data;
			GUI.fillUserListsSmall(lists);
			GUI.allListButtonClick(lists);
		});


		//user-settings button click

		$('#settings-button').click(function (){
			GUI.hideAll();
			GUI.fillUserForm(user);
			$('#user-settings').slideDown('fast'); //temp
		});	

		$('#user-settings-delete-button').click(function (){
			$('#user-delete-account-modal').modal('show');
		});

		$('#user-settings-cancel-button').click(function (){
			GUI.fillUserForm(user);
		});

		$('#user-settings-save-button').click(function (){
			var data = GUI.getUserForm();
			console.log(data);
			var newuser = {id: user.id, "profile": {"name": {}}};
			newuser.profile.displayName = data.displayName;
			newuser.profile.name.givenName = data.givenName;
			newuser.profile.name.middleName = data.middleName;
			newuser.profile.name.familyName = data.familyName;
			socket.emit('updateUser', newuser);
		});

		$('#add-list-button').click(function (){
			GUI.hideAll();
			GUI.addListButtonClick();
		});

		$('#show-all-lists-button').click(function (){
			GUI.hideAll();
			GUI.allListButtonClick(lists);
		});

		$('#add-list-save-button').click(function () {
			var newlist = GUI.addListSaveClick(user);
			console.log(newlist);
			socket.emit('addList', newlist);
			GUI.hideAll();
			//show created list (probably form socket callback)
		});

		$('#add-list-cancel-button').click(function () {
			GUI.clearAddListForm();
			GUI.hideAll();
		});

		$('.rmListConfirm').click(function () {
			var listId = $(this).attr('id');
			listId = parseInt(listId.substring(13, listId.length));
			console.log(listId);
			socket.emit('rmList', {id: listId, fbid: user.id});
			$('#user-delete-list-modal').modal('hide');
			GUI.hideAll();
		});

		$('#edit-list-cancel-button').click(function () {
			GUI.clearEditListForm();
			GUI.hideAll();
		});

		$('#edit-list-save-button').click(function () {
			var editedList = GUI.editListSaveClick(user);
			console.log(editedList);
			socket.emit('editList', editedList);
			GUI.hideAll();
		});
	};

});
