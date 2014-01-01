var GUI;

$(document).ready(function () {
	'use strict';

	//setting up datepickers for add & edit tash forms
	$('#add-task-deadline').datepicker({
		inline: true, direction: "down", minDate: new Date(), dateFormat: "dd-mm-yy"
	});

	$('#edit-task-deadline').datepicker({
		inline: true, direction: "down", minDate: new Date(), dateFormat: "dd-mm-yy"
	});

	//actions with add group/priavate list
	$('input:radio[name=addListType]').change(function (){
		var type = $('input:radio[name=addListType]:checked').val();
		// console.log(type);
		if(type === "group"){
			$('#add-list-select-groups').slideDown('fast');
		}
		else{
			$('#add-list-select-groups').slideUp('fast');				
		}
	});

GUI = {
	hideLogin: function() {
		$('#login-link').hide();
		$('#logout-link').hide();
		$('#login-panel').hide();
		$('#loggedin-panel').hide();
		$('#user-lists-small-panel').hide();
		$('#user-groups-small-panel').hide();
		$('#add-list-button').hide();
		$('#show-all-lists-button').hide();
		$('#add-group-button').hide();
		$('#show-all-groups-button').hide();
	},
	hideAll: function () {
		$('#user-settings').hide();
		$('#adding-lists').hide();
		$('#editing-lists').hide();
		$('#show-all-lists').hide();
		$('#show-all-tasks').hide();
		$('#show-all-groups').hide();
		$('#show-groups').hide();
		$('#editing-tasks').hide();
		$('#adding-tasks').hide();
		$('#adding-groups').hide();
		$('#editing-groups').hide();
		$("#user-search").hide();
	},
	fillLoginPanel: function (user){
		console.log("user.id: " + user.id);
		//fill loggedin panel with data
		GUIutils.getNormalFbPic(user.id, 'profile-normal-pic');
		// getLargeFbPic(user.id, 'fbLargePic');
		$('#profile-display-name').text(user.profile.displayName);
	},
	showLoggedin: function (){
		//hide & show elements
		$('#login-link').hide();
		$('#logout-link').show();
		$('#login-panel').hide();
		$('#loggedin-panel').show();
		$('#user-groups-small-panel').show();
		$('#user-lists-small-panel').show();
		$('#add-list-button').show();
		$('#show-all-lists-button').show();
		$('#add-group-button').show();
		$('#show-all-groups-button').show();
	},
	showNotLoggedin: function (){
		$('#login-link').show();
		$('#login-panel').show();
	},
	fillUserListsSmall: function (tab, addTaskClick, showListClick){
		$('#user-lists-small').children().remove();

		for(var i = 0; i < tab.length; i++){
			$('#user-lists-small').append('<tr>'+
				'<td><button type="button" class="btn btn-link btn-sm showListSmall"'+
				'id="showList'+ tab[i].id+'">'+ tab[i].name +'</button></td>'+
				'<td><button type="button" class="btn btn-link btn-sm pull-right addTaskSmall"'+
				' id="addTask'+ tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Dodaj zadanie</button>'+
				'</td></tr>');
		}

		//addTaskSmall button click
		$('.addTaskSmall').click(function () { addTaskClick(this); });

		//showList button click
		$('.showListSmall').click(function () { showListClick(this); });
	},
	fillUserGroupsSmall: function (tab, showGroupClick, addListClick){
		$('#user-groups-small').children().remove();

		for(var i = 0; i < tab.length; i++){
			$('#user-groups-small').append('<tr>'+
				'<td><button type="button" class="btn btn-link btn-sm showGroupSmall"'+
				'id="showGroup'+ tab[i].id+'">'+ tab[i].name +'</button></td>'+
				'<td><button type="button" class="btn btn-link btn-sm pull-right addListSmall"'+
				' id="addList'+ tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Dodaj liste</button>'+
				'</td></tr>');
		}

		//addGroupSmall button click
		$('.addListSmall').click(function () { addListClick(this); });

		//showGroup button click
		$('.showGroupSmall').click(function () { showGroupClick(this); });
	},
	fillUserAllLists: function (tab, rmClick, editClick, addTaskClick, showListClick){
		$('#show-all-lists').slideDown('fast');

		$('#user-lists-big').children().remove();
		$('#group-lists-big').children().remove();
		$('#user-lists-big').append('<tr><th>Nazwa</th><th>Opis</th><th colspan="3">Opcje</th></tr>');

		for(var i = 0; i < tab.length; i++){
			$('#user-lists-big').append('<tr>'+
				'<td><button type="button" class="btn btn-link btn-sm showListBig"'+
				'id="showListBig'+ tab[i].id+'">'+ tab[i].name +'</button></td>'+
				'<td>'+ tab[i].descr +'</td>'+
				'<td><button type="button" class="btn btn-default btn-sm pull-right editList" id="editList'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-edit"></span> Edytuj</button></td>'+
				'<td><button type="button" class="btn btn-danger btn-sm pull-right rmList" id="rmList'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-remove"></span> Usuń</button></td>'+
				'<td><button type="button" class="btn btn-primary btn-sm pull-right addTaskAll" id="addTaskBig'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Dodaj zadanie</button></td>'+
				'</tr>');
		}
		//rmList button click
		$('.rmList').click(function() { rmClick(this); });

		//editList button click
		$('.editList').click(function () { editClick(this); });

		//addListAll button click
		$('.addTaskAll').click(function () { addTaskClick(this); });

		//showList button click
		$('.showListBig').click(function () { showListClick(this); });
	},
	fillGroupLists: function (tab, rmClick, editClick, addTaskClick, showListClick){
		$('#user-lists-big').children().remove();
		$('#group-lists-big').children().remove();
		$('#group-lists-big').append('<tr><th>Nazwa</th><th>Opis</th><th colspan="3">Opcje</th></tr>');

		for(var i = 0; i < tab.length; i++){
			$('#group-lists-big').append('<tr>'+
				'<td><button type="button" class="btn btn-link btn-sm showListBig"'+
				'id="showListBig'+ tab[i].id+'">'+ tab[i].name +'</button></td>'+
				'<td>'+ tab[i].descr +'</td>'+
				'<td><button type="button" class="btn btn-default btn-sm pull-right editList" id="editList'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-edit"></span> Edytuj</button></td>'+
				'<td><button type="button" class="btn btn-danger btn-sm pull-right rmList" id="rmList'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-remove"></span> Usuń</button></td>'+
				'<td><button type="button" class="btn btn-primary btn-sm pull-right addTaskAll" id="addTaskBig'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Dodaj zadanie</button></td>'+
				'</tr>');
		}
		//rmList button click
		$('.rmList').click(function() { rmClick(this); });

		//editList button click
		$('.editList').click(function () { editClick(this); });

		//addListAll button click
		$('.addTaskAll').click(function () { addTaskClick(this); });

		//showList button click
		$('.showListBig').click(function () { showListClick(this); });
	},
	fillUserAllGroups: function (tab, editClick, rmClick, showGroupClick, addListClick){
		$('#show-all-groups').slideDown('fast');

		$('#user-groups-big').children().remove();
		$('#user-groups-big').append('<tr><th>Nazwa</th><th>Opis</th><th colspan="3">Opcje</th></tr>');

		for(var i = 0; i < tab.length; i++){
			$('#user-groups-big').append('<tr>'+
				'<td><button type="button" class="btn btn-link btn-sm showGroupBig"'+
				'id="showGroupBig'+ tab[i].id+'">'+ tab[i].name +'</button></td>'+
				'<td>'+ tab[i].descr +'</td>'+
				'<td><button type="button" class="btn btn-default btn-sm pull-right editGroup" id="editGroup'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-edit"></span> Edytuj</button></td>'+
				'<td><button type="button" class="btn btn-danger btn-sm pull-right rmGroup" id="rmGroup'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-remove"></span> Usuń</button></td>'+
				'<td><button type="button" class="btn btn-primary btn-sm pull-right addListBig" id="addListBig'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Dodaj listę</button></td>'+
				'</tr>');
		}
		//rmGroup button click
		$('.rmGroup').click(function() { rmClick(this); });

		//editGroup button click
		$('.editGroup').click(function () { editClick(this); });

		//addListBig button click
		$('.addListBig').click(function () { addListClick(this); });

		//showGroup button click
		$('.showGroupBig').click(function () { showGroupClick(this); });
	},
	fillGroupUsers: function (group, tab, rmClick){
		$('#show-groups').slideDown('fast');

		$('#show-group-name').html(group.name);
		$('#show-group-id').val(group.id);

		$('#group-users').children().remove();
		$('#group-users').append('<tr><th></th><th>Nazwa</th><th colspan="3">Opcje</th></tr>');

		for(var i = 0; i < tab.length; i++){
			$('#group-users').append('<tr><td><img id="fbImg'+tab[i].id+'"></td>'+
				'<td>'+ tab[i].profile.displayName +'</td>'+
				'<td><button type="button" class="btn btn-danger btn-sm pull-right rmUser" id="rmUser'+ 
					tab[i].id +'"' + ( tab[i].id === group.owner ? 'disabled="disabled"' : ' ' ) + '>'+
				'<span class="glyphicon glyphicon-remove"></span> Usuń z grupy</button></td>'+
				'</tr>');
			GUIutils.getSmallFbPic(tab[i].id, "fbImg"+tab[i].id);
		}
		//rmUser button click
		$('.rmUser').click(function() { rmClick(this); });
	},
	fillSearchedUsers: function (tab, addClick){
		$('#user-search').slideDown('fast');

		$('#searched-users').children().remove();
		$('#searched-users').append('<tr><th></th><th>Nazwa</th><th colspan="3">Opcje</th></tr>');

		for(var i = 0; i < tab.length; i++){
			$('#searched-users').append('<tr><td><img id="searchFbImg'+tab[i].id+'"></td>'+
				'<td>'+ tab[i].profile.displayName +'</td>'+
				'<td><button type="button" class="btn btn-success btn-sm pull-right addUser" id="addUser'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Dodaj do grupy</button></td>'+
				'</tr>');
			GUIutils.getSmallFbPic(tab[i].id, "searchFbImg"+tab[i].id);
		}
		//addUser button click
		$('.addUser').click(function() { addClick(this); });
	},
	fillUserAllTasks: function (listName, tab, rmClick, editClick, taskDoneClick){
		$('#show-all-tasks-list-name').html(listName);
		$('#user-tasks-big').children().remove();
		$('#user-tasks-big').append('<tr><th>Nazwa</th><th>Opis</th><th>Termin</th><th>Status</th>'+
			'<th colspan="3">Opcje</th></tr>');

		for(var i = 0; i < tab.length; i++){
			$('#user-tasks-big').append('<tr><td>'+ tab[i].name +'</td><td>'+ tab[i].descr +'</td>'+
				'<td>'+ tab[i].deadline.day + "-"+ tab[i].deadline.month + "-" + tab[i].deadline.year +'</td>'+
				'<td>'+ (tab[i].status ? 'wykonane' : 'nie wykonane') +'</td>'+
				'<td><button type="button" class="btn btn-default btn-sm pull-right editTask" id="editTask'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-edit"></span> Edytuj</button></td>'+
				'<td><button type="button" class="btn btn-danger btn-sm pull-right rmTask" id="rmTask'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-remove"></span> Usuń</button></td>'+
				'<td><button type="button" class="btn btn-primary btn-sm pull-right taskDone" id="taskDone'+ 
					tab[i].id +'"'+ (tab[i].status ? 'disabled="disabled"' : ' ') +'>'+
				'<span class="glyphicon glyphicon-ok"></span> Wykonaj</button></td>'+
				'</tr>');
		}
		//rmTask button click
		$('.rmTask').click(function() { rmClick(this); });

		//editTask button click
		$('.editTask').click(function () { editClick(this); });

		//taskDOne button click
		$('.taskDone').click(function () { taskDoneClick(this); });

		$('#show-all-tasks').slideDown('fast');
	},
	//functions after code-refactoring
	fillUserForm: function (user){
		$('#user-settings-displayname').val(user.profile.displayName);
		$('#user-settings-givenname').val(user.profile.name.givenName);
		$('#user-settings-middlename').val(user.profile.name.middleName);
		$('#user-settings-familyname').val(user.profile.name.familyName);
	},
	clearUserForm: function (){
		$('#user-settings-displayname').val("");
		$('#user-settings-givenname').val("");
		$('#user-settings-middlename').val("");
		$('#user-settings-familyname').val("");
	},
	getUserForm: function (){
		var newuser = {};
		newuser.displayName = $('#user-settings-displayname').val();
		newuser.givenName = $('#user-settings-givenname').val();
		newuser.middleName = $('#user-settings-middlename').val();
		newuser.familyName = $('#user-settings-familyname').val();
		return newuser;
	},
	fillAddListForm: function (groups, groupId){
		if(!groupId){
			$('#add-list-type-private').prop('checked', true);
			$('#add-list-select-groups').hide();
		}else{
			$('#add-list-type-group').prop('checked', true);
			$('#add-list-select-groups').show();
		}
		$('#add-list-group').children().remove();

		for(var i=0; i < groups.length; i++){
			$('#add-list-group').append('<option value="'+ groups[i].id +'">'+ groups[i].name +'</option>');
		}

		if(groupId){
			$('#add-list-group').val(groupId);
		}
	},
	clearAddListForm: function (){
		$('#add-list-name').val("");
		$('#add-list-description').val("");
		$('#add-list-type-private').prop('checked', true);
		$('#add-list-group').children().remove();
	},
	getAddListForm: function (){
		var newaddlist = {};
		newaddlist.name = $('#add-list-name').val();
		newaddlist.descr = $('#add-list-description').val();

		if($('input:radio[name=addListType]:checked').val() === "private"){
			newaddlist.groupid = null;
		}
		else{
			newaddlist.groupid = parseInt( $('#add-list-group').val() );
		}

		return newaddlist;
	},
	fillAddTaskForm: function (listId, groupId, members){
		$('#add-task-list-id').val(listId);
		$('#add-task-group-id').val(groupId);
		$('#add-task-executor').children().remove();
		if(members){

			for(var i=0; i < members.length; i++){
				$('#add-task-executor').append('<option value="'+ members[i].id +'">'+
					members[i].profile.displayName +'</option>');
			}
			$('#add-task-select-executor').show();
		}
		else{
			$('#add-task-select-executor').hide();
		}

		// $('#add-task-name').val(task.name);
		// $('#add-task-description').val(task.descr);
	},
	clearAddTaskForm: function (){
		$('#add-task-list-id').val("");
		$('#add-task-group-id').val("");
		$('#add-task-name').val("");
		$('#add-task-description').val("");
		$('#add-task-deadline').val("");
		$('#add-task-executor').children().remove();
	},
	getAddTaskForm: function (){
		var newaddtask = {};
		newaddtask.listid = parseInt($('#add-task-list-id').val());
		newaddtask.groupid = parseInt($('#add-task-group-id').val());
		newaddtask.name = $('#add-task-name').val();
		var date = $('#add-task-deadline').val().split('-');
		newaddtask.deadline = { "year": date[2], "month": date[1], "day": date[0] };
		// console.log(newaddtask.deadline);
		newaddtask.descr = $('#add-task-description').val();
		newaddtask.executor = $('#add-task-executor').val();
		return newaddtask;
	},
	fillEditTaskForm: function (task){
		$('#edit-task-id').val(task.id);
		$('#edit-task-list-id').val(task.listid);
		$('#edit-task-name').val(task.name);
		var date = task.deadline;
		var dateString = date.day + "-" + date.month + "-" + date.year;
		$('#edit-task-deadline').datepicker( "setDate" , dateString);
		$('#edit-task-description').val(task.descr);
		if(task.status){ $('#done').prop('checked', true); }
	},
	clearEditTaskForm: function (){
		$('#edit-task-id').val("");
		$('#edit-task-list-id').val("");
		$('#edit-task-name').val("");
		$('#edit-task-deadline').val("");
		$('#edit-task-description').val("");
		$('#notDone').prop('checked', true);
	},
	getEditTaskForm: function (){
		var editedtask = {};
		editedtask.listid = parseInt($('#edit-task-list-id').val());
		editedtask.id = parseInt($('#edit-task-id').val());
		editedtask.name = $('#edit-task-name').val();
		var date = $('#edit-task-deadline').val().split('-');
		editedtask.deadline = { "year": date[2], "month": date[1], "day": date[0] };
		if($( "input:radio[name=optionsRadios]:checked").val() === "true"){
			editedtask.status = true;
		}else{
			editedtask.status = false;
		}
		return editedtask;
	},
	fillEditListForm: function (list){
		$('#edit-list-id').val(list.id);
		$('#edit-list-name').val(list.name);
		$('#edit-list-description').val(list.descr);
	},
	clearEditListForm: function (){
		$('#edit-list-id').val("");
		$('#edit-list-name').val("");
		$('#edit-list-description').val("");
	},
	getEditListForm: function (){
		var neweditlist = {};
		neweditlist.id = parseInt($('#edit-list-id').val());
		neweditlist.name = $('#edit-list-name').val();
		neweditlist.descr = $('#edit-list-description').val();
		return neweditlist;
	},
	fillAddGroupForm: function (group){
		// $('#add-group-name').val(group.name);
		// $('#add-group-description').val(group.descr);
	},
	clearAddGroupForm: function (){
		$('#add-group-name').val("");
		$('#add-group-description').val("");
	},
	getAddGroupForm: function (){
		var newaddgroup = {};
		newaddgroup.name = $('#add-group-name').val();
		newaddgroup.descr = $('#add-group-description').val();
		return newaddgroup;
	},
	fillEditGroupForm: function (group){
		 $('#edit-group-id').val(group.id);
		 $('#edit-group-name').val(group.name);
		 $('#edit-group-description').val(group.descr);
	},
	clearEditGroupForm: function (){
		$('#edit-group-id').val("");
		$('#edit-group-name').val("");
		$('#edit-group-description').val("");
	},
	getEditGroupForm: function (){
		var neweditgroup = {};
		neweditgroup.id = parseInt($('#edit-group-id').val());
		neweditgroup.name = $('#edit-group-name').val();
		neweditgroup.descr = $('#edit-group-description').val();
		return neweditgroup;
	},
	fillDeleteListModal: function (list){
		$('#user-delete-list-modal-id').val(list.id);
		$('#user-delete-list-modal-name').text("Nazwa listy: " + list.name);
	},
	fillDeleteTaskModal: function (task){
		$('#user-delete-task-modal-id').val(task.id);
		$('#user-delete-task-modal-list-id').val(task.listid);
		$('#user-delete-task-modal-name').text("Nazwa zadania: " + task.name);
	},
	fillDoneTaskModal: function (task){
		$('#user-done-task-modal-id').val(task.id);
		$('#user-done-task-modal-list-id').val(task.listid);
		$('#user-done-task-modal-name').text("Nazwa zadania: " + task.name);
	},
	fillDeleteGroupModal: function (group){
		$('#user-delete-group-modal-id').val(group.id);
		$('#user-delete-group-modal-name').text("Nazwa grupy: " + group.name);
	},
	getDeleteListModal: function (){
		var listId = parseInt($('#user-delete-list-modal-id').val());
		return listId;
	},
	getDeleteTaskModal: function (){
		var taskId = parseInt($('#user-delete-task-modal-id').val());
		var listId = parseInt($('#user-delete-task-modal-list-id').val());
		return {"id": taskId, "listid": listId};
	},
	getDoneTaskModal: function (){
		var taskId = parseInt($('#user-done-task-modal-id').val());
		var listId = parseInt($('#user-done-task-modal-list-id').val());
		return {"id": taskId, "listid": listId};
	},
	getDeleteGroupModal: function (){
		var groupId = parseInt($('#user-delete-group-modal-id').val());
		return groupId;
	},
	showUsersSettings: function (){
		$('#user-settings').slideDown('fast');
	},
	showAddingListForm: function (groups, groupId){
		$('#adding-lists').slideDown('fast');
	},
	showEditingListForm: function (){
		$('#editing-lists').slideDown('fast');
	},
	showAddingTaskForm: function (){
		$('#adding-tasks').slideDown('fast');
	},
	showEditingTaskForm: function (){
		$('#editing-tasks').slideDown('fast');
	},
	showAddingGroupForm: function (){
		$('#adding-groups').slideDown('fast');
	},
	showEditingGroupForm: function (){
		$('#editing-groups').slideDown('fast');
	},
	showUserSearchForm: function (){
		$('#user-search').slideDown('fast');
	},
	showDeleteAccountModal: function (){
		$('#user-delete-account-modal').modal('show');
	},
	showDeleteListModal: function (){
		$('#user-delete-list-modal').modal('show');
	},
	showDeleteTaskModal: function (){
		$('#user-delete-task-modal').modal('show');
	},
	showDoneTaskModal: function (){
		$('#user-done-task-modal').modal('show');
	},
	showDeleteGroupModal: function (){
		$('#user-delete-group-modal').modal('show');
	}
};

});
