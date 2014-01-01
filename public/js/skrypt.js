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

			GUI.fillAddTaskForm(id);
			GUI.hideAll();
			GUI.showAddingTaskForm();
		};
		//edit task button click
		var editTaskCLick = function (that){
			var taskid = $(that).attr('id');
			taskid = taskid.substring(8, taskid.length);

			$.getJSON('http://localhost:3000/data/get/task/'+taskid+'/', function (task){
				GUI.fillEditTaskForm(task);
				GUI.hideAll();
				GUI.showEditingTaskForm();
			});
		};
		//remove task button click
		var rmTaskClick = function (that){
			var taskid = $(that).attr('id');
			taskid = taskid.substring(6,taskid.length);
			$.getJSON('http://localhost:3000/data/get/task/'+taskid+'/', function (task){
				GUI.fillDeleteTaskModal(task);
				GUI.showDeleteTaskModal();
			});
		};
		//make task done button click
		var taskDoneClick = function (that){
			var taskid = $(that).attr('id');
			taskid = taskid.substring(8, taskid.length);
			$.getJSON('http://localhost:3000/data/get/task/'+taskid+'/', function (task){
				GUI.fillDoneTaskModal(task);
				GUI.showDoneTaskModal();
			});
		};
		//show list buton click
		var showListClick = function (that){
			var listid = $(that).attr('id');
			var listName = $(that).html();

			if(listid.substring(0,11) === "showListBig"){
				listid = listid.substring(11, listid.length);
			}
			else if(listid.substring(0,8) === "showList"){
				listid = listid.substring(8, listid.length);
			}

			$.getJSON('http://localhost:3000/data/get/tasks/'+listid+'/', function (tasks){
				GUI.hideAll();
				GUI.fillUserAllTasks(listName, tasks, rmTaskClick, editTaskCLick, taskDoneClick);
			});

		};

		$('#show-all-lists-button').click(function (){
			$.getJSON('http://localhost:3000/data/get/lists/', function (lists){
				GUI.hideAll();
				GUI.fillUserAllLists(lists, rmListClick, editListClick, addTaskClick, showListClick);
			});
		});
		$('#rmListConfirm').click(function () {
			var listId = GUI.getDeleteListModal();
			socket.emit('rmList', {id: listId, fbid: user.id});
			$('#user-delete-list-modal').modal('hide');
			GUI.hideAll();
		});
		//add-list
		$('#add-list-button').click(function (){
			$.getJSON('http://localhost:3000/data/get/groups/', function (groups){
				GUI.hideAll();
				GUI.clearAddListForm();
				GUI.fillAddListForm(groups);
				GUI.showAddingListForm();
			});
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
			socket.emit('addTask', newTask);
			GUI.hideAll();
		});
		//edit-task
		$('#edit-task-cancel-button').click(function (){
			GUI.clearEditTaskForm();
			GUI.hideAll();
		});

		$('#edit-task-save-button').click(function (){
			var editedTask = GUI.getEditTaskForm();
			editedTask.fbid = user.id;
			socket.emit('editTask', editedTask);
			GUI.hideAll();
		});
		//remove task confirm
		$('#rmTaskConfirm').click(function () {
			var rmedTask = GUI.getDeleteTaskModal();
			socket.emit('rmTask', {id: rmedTask.id, listid: rmedTask.listid, fbid: user.id});
			$('#user-delete-task-modal').modal('hide'); //temp
			GUI.hideAll();
		});
		//task done confirm
		$('#doneTaskConfirm').click(function (){
			var doneTask = GUI.getDoneTaskModal();
			doneTask.fbid = user.id;
			socket.emit('doneTask', doneTask);
			$('#user-done-task-modal').modal('hide');
			GUI.hideAll();
		});
		//add-gruop
		$('#add-group-button').click(function (){
			GUI.hideAll();
			GUI.clearAddGroupForm();
			GUI.showAddingGroupForm();
		});

		$('#add-group-save-button').click(function (){
			var newGroup = GUI.getAddGroupForm();
			newGroup.owner = user.id;
			socket.emit('addGroup', newGroup);
			GUI.hideAll();

		});

		$('#add-group-cancel-button').click(function (){
			GUI.clearAddGroupForm();
			GUI.hideAll();
		});
		//edit-group
		var editGroupClick = function (that){
			var groupid = $(that).attr('id');
			groupid = groupid.substring(9, groupid.length);

			$.getJSON('http://localhost:3000/data/get/group/'+groupid+'/', function (group){
				GUI.fillEditGroupForm(group);
				GUI.hideAll();
				GUI.showEditingGroupForm();
			});
		};

		$('#edit-group-save-button').click(function (){
			var editedGroup = GUI.getEditGroupForm();
			editedGroup.fbid = user.id;
			socket.emit('editGroup', editedGroup);
			GUI.hideAll();
		});

		$('#edit-group-cancel-button').click(function (){
			GUI.clearEditGroupForm();
			GUI.hideAll();
		});
		//rm-group
		var rmGroupClick = function (that){
			var groupid = $(that).attr('id');
			groupid = groupid.substring(7, groupid.length);

			$.getJSON('http://localhost:3000/data/get/group/'+groupid+'/', function (group){
				GUI.fillDeleteGroupModal(group);
				GUI.showDeleteGroupModal();
			});
		};

		$('#deleteGroupConfirm').click(function (){
			var data = {};
			data.id = GUI.getDeleteGroupModal();
			data.fbid = user.id;
			socket.emit('rmGroup', data);
			$('#user-delete-group-modal').modal('hide');
		});

		//add list to group
		var addListToGroupClick = function (that){
			var groupid = $(that).attr('id');
			// console.log(groupid);

			if(groupid.substring(0,10) === "addListBig"){
				groupid = groupid.substring(10, groupid.length);
			}
			else if(groupid.substring(0,7) === "addList"){
				groupid = groupid.substring(7, groupid.length);
			}

			console.log(groupid);

			$.getJSON('http://localhost:3000/data/get/groups/', function (groups){
				GUI.hideAll();
				GUI.clearAddListForm();
				GUI.fillAddListForm(groups, groupid);
				GUI.showAddingListForm();
			});
		};

		//remove user from group
		var removeUserFromGroupClick = function (that){
			var userid = $(that).attr('id');
			userid = userid.substring(6, userid.length);
			var groupid = parseInt($('#show-group-id').val());

			socket.emit('removeUserFromGroup', {"fbid": user.id, "user": userid, "group": groupid});		
		};

		var showGroupClick = function (that){
			var groupid = $(that).attr('id');
			if(groupid.substring(0, 12) === "showGroupBig"){
				groupid = groupid.substring(12, groupid.length);
			}else if(groupid.substring(0,9) === "showGroup"){
				groupid = groupid.substring(9 , groupid.length);
			}

			$.getJSON('http://localhost:3000/data/get/group/all/'+groupid+'/', function (data){
				GUI.hideAll();
				GUI.fillGroupLists(data.lists, rmListClick, editListClick, addTaskClick, showListClick);
				GUI.fillGroupUsers(data.group, data.members, removeUserFromGroupClick);
				GUI.showUserSearchForm();
			});
		};

		//add user to group
		var addUserToGroupClick = function (that){
			var userid = $(that).attr('id');
			userid = userid.substring(7, userid.length);
			var groupid = parseInt($('#show-group-id').val());

			socket.emit('addUserToGroup', {"fbid": user.id, "user": userid, "group": groupid});
		};

		//search users
		$('#search-user-button').click(function (){
			var query = $('#search-user-query').val().replace(/\s/g,"%20");
			$.getJSON('http://localhost:3000/data/search/users/'+query+'/', function (data){
				GUI.fillSearchedUsers(data, addUserToGroupClick);
			});
		});

		//show user groups
		$('#show-all-groups-button').click(function (){
			$.getJSON('http://localhost:3000/data/get/groups/', function (groups){
				GUI.hideAll();
				GUI.fillUserAllGroups(groups, editGroupClick, rmGroupClick, showGroupClick, addListToGroupClick);
				GUI.fillUserGroupsSmall(groups, showGroupClick, addListToGroupClick);
			});
		});


		//sockets.io
		var socket = io.connect('http://localhost:3000');

		console.log('connecting…');

		socket.on('connect', function () {
			console.log('Połączony!');
		});
		//Update user
		socket.on('updatedUser', function (data) {
			user = data;
			GUI.fillUserForm(user);
		});
		//Add list
		socket.on('addedList', function (data) {
			GUI.fillUserListsSmall(data, addTaskClick, showListClick);
			GUI.fillUserAllLists(data, rmListClick, editListClick, addTaskClick, showListClick);
		});
		//Remove list
		socket.on('rmedList', function (data) {
			GUI.fillUserListsSmall(data, addTaskClick, showListClick);
			GUI.fillUserAllLists(data, rmListClick, editListClick, addTaskClick, showListClick);
		});
		//Edit list
		socket.on('editedList', function (data) {
			GUI.fillUserListsSmall(data, addTaskClick, showListClick);
			GUI.fillUserAllLists(data, rmListClick, editListClick, addTaskClick, showListClick);
		});
		//Add task
		socket.on('addedTask', function (data) {
			GUI.fillUserAllTasks(data.list.name, data.tasks, rmTaskClick, editTaskCLick, taskDoneClick);
		});
		//Edit task
		socket.on('editedTask', function (data) {
			GUI.fillUserAllTasks(data.list.name, data.tasks, rmTaskClick, editTaskCLick, taskDoneClick);
		});
		//Remove task
		socket.on('rmedTask', function (data) {
			GUI.fillUserAllTasks(data.list.name, data.tasks, rmTaskClick, editTaskCLick, taskDoneClick);
		});
		//Done task
		socket.on('doneTask', function (data) {
			GUI.fillUserAllTasks(data.list.name, data.tasks, rmTaskClick, editTaskCLick, taskDoneClick);
		});
		//Add group
		socket.on('addedGroup', function (data){
			GUI.fillUserAllGroups(data, editGroupClick, rmGroupClick, showGroupClick, addListToGroupClick);
			GUI.fillUserGroupsSmall(data, showGroupClick, addListToGroupClick);
		});
		//Edit group
		socket.on('editedGroup', function (data){
			GUI.fillUserAllGroups(data, editGroupClick, rmGroupClick, showGroupClick, addListToGroupClick);
			GUI.fillUserGroupsSmall(data, showGroupClick, addListToGroupClick);
		});
		//Rm group
		socket.on('rmedGroup', function (data){
			GUI.fillUserAllGroups(data, editGroupClick, rmGroupClick, showGroupClick, addListToGroupClick);
			GUI.fillUserGroupsSmall(data, showGroupClick, addListToGroupClick);
		});
		//Add user to group
		socket.on('addUserToGroup', function (data){
			GUI.fillGroupLists(data.lists, rmListClick, editListClick, addTaskClick, showListClick);
			GUI.fillGroupUsers(data.group, data.members, removeUserFromGroupClick);
		});

		//Remove user from group
		socket.on('removeUserFromGroup', function (data){
			GUI.fillGroupLists(data.lists, rmListClick, editListClick, addTaskClick, showListClick);
			GUI.fillGroupUsers(data.group, data.members, removeUserFromGroupClick);
		});
		//---

		//fill user data
		GUI.fillLoginPanel(user);
		// hide & show elements
		GUI.showLoggedin();
		//get & show lists' panel
		$.getJSON('http://localhost:3000/data/get/lists/', function (lists){
			GUI.fillUserListsSmall(lists, addTaskClick, showListClick);
		
			$.getJSON('http://localhost:3000/data/get/groups/', function (groups){
				GUI.fillUserGroupsSmall(groups, showGroupClick, addListToGroupClick);
			});
		});

	};

});
