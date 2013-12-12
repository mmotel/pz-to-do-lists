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
		//array 'lists' contains all user's lists

		//add task button click
		var addTaskClick = function (that){
			var id = $(that).attr('id');
			if(id.substring(0,10) === "addTaskBig"){
				id = id.substring(10, id.length);
			}else if(id.substring(0, 7) === "addTask"){
				id = id.substring(7, id.length);
			}
			console.log(id);

			GUI.fillAddTaskForm(id);
			GUI.hideAll();
			GUI.showAddingTaskForm();
		};
		
		console.log(lists);
		//fill user data
		GUI.fillLoginPanel(user);
		//fill small list's list
		GUI.fillUserListsSmall(lists, addTaskClick);
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
				console.log(data);
				lists.push(data);
				GUI.fillUserListsSmall(lists, addTaskClick);
			}
		});
		//Remove list
		socket.on('rmedList', function (data) {
			lists = data;
			GUI.fillUserListsSmall(lists, addTaskClick);
			GUI.fillUserAllLists(lists, rmListClick, editListClick);
		});
		//Edit list
		socket.on('editedList', function (data) {
			lists = data;
			GUI.fillUserListsSmall(lists, addTaskClick);
			GUI.allListButtonClick(lists);
		});
		//Add task
		socket.on('addedTask', function (data) {
			console.log(data);
			//TO-DO: update tasks' array and show new task on task list
		});
		//---

		//user-settings
		$('#settings-button').click(function (){
			GUI.hideAll();
			GUI.fillUserForm(user);
			GUI.showUsersSettings();
		});	

		$('#user-settings-delete-button').click(function (){
			GUI.showDeleteAccountModal();
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
		//---
		//all-lists
		var rmListClick = function (that) {
			var listId = $(that).attr('id');
			listId = parseInt(listId.substring(6, listId.length));

			for(var i =0; i < lists.length; i++){
				if(lists[i].id === listId){
					GUI.fillDeleteListModal(lists[i]);
					GUI.showDeleteListModal();
					break;
				}
			}
		};

		var editListClick = function (that) {
			var listId = $(that).attr('id');
			listId = parseInt(listId.substring(8, listId.length));

			for(var i =0; i < lists.length; i++){
				if(lists[i].id === listId){
					GUI.fillEditListForm(lists[i]);
					GUI.hideAll();
					GUI.showEditingListForm();
					break;
				}
			}
		};

		$('#show-all-lists-button').click(function (){
			GUI.hideAll();
			GUI.fillUserAllLists(lists, rmListClick, editListClick, addTaskClick);
		});
		$('.rmListConfirm').click(function () {
			var listId = GUI.getDeleteListModal();
			console.log(listId);
			socket.emit('rmList', {id: listId, fbid: user.id});
			$('#user-delete-list-modal').modal('hide'); //temp
			GUI.hideAll();
		});
		//add-list
		$('#add-list-button').click(function (){
			GUI.hideAll();
			GUI.clearAddListForm();
			GUI.showAddingListForm();
		});

		$('#add-list-save-button').click(function () {
			var newlist = GUI.getAddListForm();
			newlist.fbid = user.id;
			console.log(newlist);
			socket.emit('addList', newlist);
			GUI.clearAddListForm();
			GUI.hideAll();
		});

		$('#add-list-cancel-button').click(function () {
			GUI.clearAddListForm();
			GUI.hideAll();
		});
		//edit-list
		$('#edit-list-save-button').click(function () {
			var editedList = GUI.getEditListForm();
			editedList.fbid = user.id;
			console.log(editedList);
			socket.emit('editList', editedList);
			GUI.hideAll();
		});

		$('#edit-list-cancel-button').click(function () {
			GUI.clearEditListForm();
			GUI.hideAll();
		});
		//add-task
		$('#add-task-cancel-button').click(function (){
			GUI.clearAddTaskForm();
			GUI.hideAll();
		});

		$('#add-task-save-button').click(function (){
			var newTask = GUI.getAddTaskForm();
			newTask.fbid = user.id;
			console.log(newTask);
			socket.emit('addTask', newTask);
			GUI.hideAll();
		});
	};

});
