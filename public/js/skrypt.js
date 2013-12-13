/*jshint node: true, browser: true, jquery: true */
/*global io: false */
$(document).ready(function () {
	'use strict';

	//hiding elements
	GUI.hideLogin();
	GUI.hideAll();
	//---

	//starting front-end
	$.getJSON('http://localhost:3000/getLogin', function (data){ 
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

			$.getJSON('http://localhost:3000/data/get/list/'+listId+'/', function (list){
				GUI.fillDeleteListModal(list);
				GUI.showDeleteListModal();
			});
		};

		var editListClick = function (that) {
			var listId = $(that).attr('id');
			listId = parseInt(listId.substring(8, listId.length));

			$.getJSON('http://localhost:3000/data/get/list/'+listId+'/', function (list){
				GUI.fillEditListForm(list);
				GUI.hideAll();
				GUI.showEditingListForm();
			});
		};

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

		var showListClick = function (that){
			var listid = $(that).attr('id');
			var listName = $(that).html();
			console.log(listid);
			if(listid.substring(0,11) === "showListBig"){
				listid = listid.substring(11, listid.length);
			}
			else if(listid.substring(0,8) === "showList"){
				listid = listid.substring(8, listid.length);
			}

			$.getJSON('http://localhost:3000/data/get/tasks/'+listid+'/', function (tasks){
				GUI.hideAll();
				GUI.fillUserAllTasks(listName, tasks);
			});

		};

		$('#show-all-lists-button').click(function (){
			$.getJSON('http://localhost:3000/data/get/lists/', function (lists){
				GUI.hideAll();
				GUI.fillUserAllLists(lists, rmListClick, editListClick, addTaskClick, showListClick);
			});
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
			GUI.fillUserForm(user);
		});
		//Add list
		socket.on('addedList', function (data) {
			GUI.fillUserListsSmall(data, addTaskClick, showListClick);
			GUI.fillUserAllLists(data, rmListClick, editListClick, showListClick);
		});
		//Remove list
		socket.on('rmedList', function (data) {
			// lists = data;
			GUI.fillUserListsSmall(data, addTaskClick, showListClick);
			GUI.fillUserAllLists(data, rmListClick, editListClick, showListClick);
		});
		//Edit list
		socket.on('editedList', function (data) {
			// lists = data;
			GUI.fillUserListsSmall(data, addTaskClick, showListClick);
			GUI.fillUserAllLists(data, rmListClick, editListClick, showListClick);
		});
		//Add task
		socket.on('addedTask', function (data) {
			console.log(data);
			GUI.fillUserAllTasks(data.list.name, data.tasks);
			//TO-DO: update tasks' array and show new task on task list
		});
		//---

		//start-up actions

		
		//fill user data
		GUI.fillLoginPanel(user);
		// hide & show elements
		GUI.showLoggedin();
		//get & show lists' panel
		$.getJSON('http://localhost:3000/data/get/lists/', function (lists){
			GUI.fillUserListsSmall(lists, addTaskClick, showListClick);
		});

	};

});
