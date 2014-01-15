/*jshint node: true, browser: true, jquery: true */
/*global io: false */
$(document).ready(function () {
	'use strict';

	//hiding elements
	GUI.hideLogin();
	GUI.hideAll();
	//---

	//helper functions
	var isMember = function (members, userId){
		for(var i = 0; i < members.length; i++){
			if(members[i].fbid === userId){ return true; }
		}
		return false;
	}

	var findGroup = function (groups, groupId){
		for(var i = 0; i < groups.length; i++){
			if(groups[i].id === groupId){ return groups[i]; }
		}
		return null;
	}
	//---

	//permissions functions
	var canAddTask = function (groups, list, userId){
		var group = findGroup(groups, list.groupid);
		if(list.perms.addTask){
			if(list.fbid === userId || group.owner === userId){ return true; }
			else { return false; }
		}
		else if(isMember(group.members, userId)) { return true; }
		else { return false; }
	};
	var canEditTask = function (group, list, task, userId){
		if(list.perms.editTask){
			if(list.fbid === userId || group.owner === userId || task.fbid === userId){ return true; }
			else { return false; }
		}
		else if(isMember(group.members, userId)) { return true; }
		else { return false; }
	};
	var canRmTask = function (group, list, task, userId){
		if(list.perms.rmTask){
			if(list.fbid === userId || group.owner === userId || task.fbid === userId){ return true; }
			else { return false; }
		}
		else if(isMember(group.members, userId)) { return true; }
		else { return false; }
	};
	var canChangeStatusTask = function (group, list, task, userId){
		if(list.perms.status){
			if(list.fbid === userId || group.owner === userId || task.fbid === userId || 
				task.executor == userId){ return true; }
			else { return false; }
		}
		else if(isMember(group.members, userId)) { return true; }
		else { return false; }
	};

	var canAddRmMembers = function (group, userId){
		if(group.perms.addRmMembers){
			if(group.owner === userId){ return true; }
			else { return false; }
		}
		else if(isMember(group.members, userId)){ return true; }
		else { return false; }
	};
	var canAddList = function (group, userId){
		if(group.perms.addList){
			if(group.owner === userId){ return true; }
			else { return false; }
		}
		else if(isMember(group.members, userId)){ return true; }
		else { return false; }		
	}
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
			GUI.clearEditListForm();
			var listId = $(that).attr('id');
			listId = parseInt(listId.substring(8, listId.length));

			$.getJSON('http://localhost:3000/data/get/list/'+listId+'/', function (list){
				if(list.groupid !== null){
					$.getJSON('http://localhost:3000/data/get/group/'+list.groupid+'/', function (group){
						GUI.fillEditListForm(list);
						GUI.hideAll();
						GUI.showEditingListForm();	
						if(user.id === list.fbid || user.id === group.owner){
							GUI.fillPermsListForm(list.perms);	
							GUI.showPermsListForm();					
						}
					});
				}
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

			$.getJSON('http://localhost:3000/data/get/list/'+id+'/', function (list){
				console.log(list);
				if(list.groupid !== null){
					$.getJSON('http://localhost:3000/data/get/group/members/'+list.groupid+'/', function (data){
						console.log(data.members);
					GUI.fillAddTaskForm(id, list.groupid, data.members);
					GUI.hideAll();
					GUI.showAddingTaskForm();			
					});
				}
				else{		
					GUI.fillAddTaskForm(id, null);
					GUI.hideAll();
					GUI.showAddingTaskForm();
				}
			});
		};
		//edit task button click
		var editTaskCLick = function (that){
			var taskid = $(that).attr('id');
			taskid = taskid.substring(8, taskid.length);

			$.getJSON('http://localhost:3000/data/get/task/'+taskid+'/', function (task){

				if(task.groupid !== null){
					$.getJSON('http://localhost:3000/data/get/group/members/'+task.groupid+'/', function (data){
						GUI.fillEditTaskForm(task, task.groupid, data.members);
						GUI.hideAll();
						GUI.showEditingTaskForm();
					});
				}
				else{
					GUI.fillEditTaskForm(task, task.groupid);
					GUI.hideAll();
					GUI.showEditingTaskForm();
				}
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

			$.getJSON('http://localhost:3000/data/get/tasks/'+listid+'/', function (data){
				console.log(data);
				if(data.list.groupid !== null){
					$.getJSON('http://localhost:3000/data/get/group/members/'+data.list.groupid+'/', function (group){
						GUI.hideAll();
						GUI.fillUserAllTasks(data.list, data.tasks, rmTaskClick, editTaskCLick, taskDoneClick, 
							group.members, group.group, user.id, canEditTask, canRmTask, canChangeStatusTask);
					});
				}
				else{
					GUI.hideAll();
					GUI.fillUserAllTasks(data.list, data.tasks, rmTaskClick, editTaskCLick, taskDoneClick);
				}
			});

		};

		$('#show-all-lists-button').click(function (){
			$.getJSON('http://localhost:3000/data/get/lists/', function (lists){
				$.getJSON('http://localhost:3000/data/get/groups/', function (groups){
					GUI.hideAll();
					GUI.fillUserAllLists(lists, rmListClick, editListClick, addTaskClick, showListClick,
						groups, user.id, canAddTask);
				});
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
				GUI.fillAddListForm(groups, canAddList, user.id);
				GUI.showAddingListForm();
			});
		});

		$('#add-list-save-button').click(function () {
			var newlist = GUI.getAddListForm();
			if(newlist !== undefined){
				newlist.fbid = user.id;
				console.log(newlist);
				if(newlist.groupid !== null){
					newlist.perms = GUI.getPermsListForm();
				}
				else{
					newlist.perms = null;
				}
				socket.emit('addList', newlist);
				GUI.clearAddListForm();
				GUI.hideAll();
			}
		});

		$('#add-list-cancel-button').click(function () {
			GUI.clearAddListForm();
			GUI.hideAll();
		});
		//edit-list
		$('#edit-list-save-button').click(function () {
			var editedList = GUI.getEditListForm();
			if(editedList !== undefined){
				editedList.fbid = user.id;
				console.log(editedList.groupid);
				if(editedList.groupid !== NaN){
					editedList.perms = GUI.getPermsListForm();
				}
				else{
					editedTask.perms = null;
				}
				socket.emit('editList', editedList);
				GUI.hideAll();
				}
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
			if(newTask !== undefined){
				newTask.fbid = user.id;
				if(newTask.executor === null){
					newTask.executor = user.id;
				}

				socket.emit('addTask', newTask);
				GUI.clearAddTaskForm();
				GUI.hideAll();
			}
		});
		//edit-task
		$('#edit-task-cancel-button').click(function (){
			GUI.clearEditTaskForm();
			GUI.hideAll();
		});

		$('#edit-task-save-button').click(function (){
			var editedTask = GUI.getEditTaskForm();
			if(editedTask !== undefined){
				editedTask.fbid = user.id;

				if(editedTask.executor === null){
					editedTask.executor = user.id;
				}

				socket.emit('editTask', editedTask);
				GUI.hideAll();
			}
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
			GUI.fillPermsGroupForm();
			GUI.showPermsGroupForm();
			GUI.showAddingGroupForm();
		});

		$('#add-group-save-button').click(function (){
			var newGroup = GUI.getAddGroupForm();
			if(newGroup !== undefined){
				newGroup.owner = user.id;
				newGroup.perms = GUI.getPermsGroupForm();
				socket.emit('addGroup', newGroup);
				GUI.hideAll();
			}

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
				if(group.owner === user.id){
					GUI.fillPermsGroupForm(group.perms);
					GUI.showPermsGroupForm();
				}
			});
		};

		$('#edit-group-save-button').click(function (){
			var editedGroup = GUI.getEditGroupForm();
			if(editedGroup !== undefined){
				editedGroup.fbid = user.id;
				editedGroup.perms = GUI.getPermsGroupForm();
				socket.emit('editGroup', editedGroup);
				GUI.hideAll();
			}
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
				if(groupid !== null){
					GUI.fillPermsListForm();
					GUI.showPermsListForm();
				}
				GUI.fillAddListForm(groups, canAddList, user.id, groupid);
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
				var groups = [ data.group ];
				GUI.hideAll();
				GUI.fillGroupLists(data.lists, rmListClick, editListClick, addTaskClick, showListClick, 
					groups, user.id, canAddTask);
				GUI.fillGroupUsers(data.group, data.members, removeUserFromGroupClick, canAddRmMembers, user.id);
				if(canAddRmMembers(data.group, user.id)){
					GUI.showUserSearchForm();
				}
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
				GUI.fillUserAllGroups(groups, editGroupClick, rmGroupClick, showGroupClick, 
					addListToGroupClick, canAddList, user.id);
				GUI.fillUserGroupsSmall(groups, showGroupClick, addListToGroupClick, canAddList, user.id);
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
			$.getJSON('http://localhost:3000/data/get/groups/', function (groups){
				GUI.fillUserListsSmall(data, addTaskClick, showListClick, groups, canAddTask, user.id);
				GUI.fillUserAllLists(data, rmListClick, editListClick, addTaskClick, showListClick, 
					groups, user.id, canAddTask);
			});
		});
		//Remove list
		socket.on('rmedList', function (data) {
			$.getJSON('http://localhost:3000/data/get/groups/', function (groups){
				GUI.fillUserListsSmall(data, addTaskClick, showListClick, groups, canAddTask, user.id);
				GUI.fillUserAllLists(data, rmListClick, editListClick, addTaskClick, showListClick, 
					groups, user.id, canAddTask);
			});
		});
		//Edit list
		socket.on('editedList', function (data) {
			$.getJSON('http://localhost:3000/data/get/groups/', function (groups){
				GUI.fillUserListsSmall(data, addTaskClick, showListClick, groups, canAddTask, user.id);
				GUI.fillUserAllLists(data, rmListClick, editListClick, addTaskClick, showListClick, 
					groups, user.id, canAddTask);
			});
		});
		//Add task
		socket.on('addedTask', function (data) {
			if(data.list.groupid !== null){
				$.getJSON('http://localhost:3000/data/get/group/members/'+data.list.groupid+'/', function (group){
					GUI.fillUserAllTasks(data.list, data.tasks, rmTaskClick, editTaskCLick, taskDoneClick, 
						group.members, group.group, user.id, canEditTask, canRmTask, canChangeStatusTask);
				});
			}
			else{
				GUI.fillUserAllTasks(data.list, data.tasks, rmTaskClick, editTaskCLick, taskDoneClick);
			}
		});
		//Edit task
		socket.on('editedTask', function (data) {
			if(data.list.groupid !== null){
				$.getJSON('http://localhost:3000/data/get/group/members/'+data.list.groupid+'/', function (group){
					GUI.fillUserAllTasks(data.list, data.tasks, rmTaskClick, editTaskCLick, taskDoneClick, 
						group.members, group.group, user.id, canEditTask, canRmTask, canChangeStatusTask);
				});
			}
			else{
				GUI.fillUserAllTasks(data.list, data.tasks, rmTaskClick, editTaskCLick, taskDoneClick);
			}
		});
		//Remove task
		socket.on('rmedTask', function (data) {
			if(data.list.groupid !== null){
				$.getJSON('http://localhost:3000/data/get/group/members/'+data.list.groupid+'/', function (group){
					GUI.fillUserAllTasks(data.list, data.tasks, rmTaskClick, editTaskCLick, taskDoneClick, 
						group.members, group.group, user.id, canEditTask, canRmTask, canChangeStatusTask);
				});
			}
			else{
				GUI.fillUserAllTasks(data.list, data.tasks, rmTaskClick, editTaskCLick, taskDoneClick);
			}
		});
		//Done task
		socket.on('doneTask', function (data) {
			if(data.list.groupid !== null){
				$.getJSON('http://localhost:3000/data/get/group/members/'+data.list.groupid+'/', function (group){
					GUI.fillUserAllTasks(data.list, data.tasks, rmTaskClick, editTaskCLick, taskDoneClick, 
						group.members, group.group, user.id, canEditTask, canRmTask, canChangeStatusTask);
				});
			}
			else{
				GUI.fillUserAllTasks(data.list, data.tasks, rmTaskClick, editTaskCLick, taskDoneClick);
			}
		});
		//Add group
		socket.on('addedGroup', function (data){
			GUI.fillUserAllGroups(data, editGroupClick, rmGroupClick, showGroupClick, 
				addListToGroupClick, canAddList, user.id);
			GUI.fillUserGroupsSmall(data, showGroupClick, addListToGroupClick, canAddList, user.id);
		});
		//Edit group
		socket.on('editedGroup', function (data){
			GUI.fillUserAllGroups(data, editGroupClick, rmGroupClick, showGroupClick, 
				addListToGroupClick, canAddList, user.id);
			GUI.fillUserGroupsSmall(data, showGroupClick, addListToGroupClick, canAddList, user.id);
		});
		//Rm group
		socket.on('rmedGroup', function (data){
			GUI.fillUserAllGroups(data, editGroupClick, rmGroupClick, showGroupClick, 
				addListToGroupClick, canAddList, user.id);
			GUI.fillUserGroupsSmall(data, showGroupClick, addListToGroupClick, canAddList, user.id);
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
			
		
			$.getJSON('http://localhost:3000/data/get/groups/', function (groups){
				GUI.fillUserListsSmall(lists, addTaskClick, showListClick, groups, canAddTask, user.id);
				GUI.fillUserGroupsSmall(groups, showGroupClick, addListToGroupClick, canAddList, user.id);
			});
		});

	};

});
