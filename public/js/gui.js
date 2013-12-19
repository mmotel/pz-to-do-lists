var GUI = {
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
		$('#editing-tasks').hide();
		$('#adding-tasks').hide();
		$('#adding-groups').hide();
		$('#editing-groups').hide();
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
	fillUserGroupsSmall: function (tab, addListClick, showGroupClick){
		$('#user-groups-small').children().remove();

		for(var i = 0; i < tab.length; i++){
			$('#user-groups-small').append('<tr>'+
				'<td><button type="button" class="btn btn-link btn-sm showGroupsSmall"'+
				'id="showGroups'+ tab[i].id+'">'+ tab[i].name +'</button></td>'+
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
	fillUserAllGroups: function (tab, rmClick, editClick, addListClick, showListClick){
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
				'<td><button type="button" class="btn btn-primary btn-sm pull-right addListAll" id="addListBig'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Dodaj listę</button></td>'+
				'</tr>');
		}
		//rmGroup button click
		$('.rmGroup').click(function() { rmClick(this); });

		//editGroup button click
		$('.editGroup').click(function () { editClick(this); });

		//addListAll button click
		$('.addListAll').click(function () { addListClick(this); });

		//showGroup button click
		$('.showGroupBig').click(function () { showGroupClick(this); });
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
	fillAddListForm: function (list){
		$('#add-list-name').val(list.name);
		$('#add-list-description').val(list.descr);
	},
	clearAddListForm: function (){
		$('#add-list-name').val("");
		$('#add-list-description').val("");
	},
	getAddListForm: function (){
		var newaddlist = {};
		newaddlist.name = $('#add-list-name').val();
		newaddlist.descr = $('#add-list-description').val();
		return newaddlist;
	},
	fillAddTaskForm: function (listId, task){
		$('#add-task-list-id').val(listId);
		// $('#add-task-name').val(task.name);
		// $('#add-task-description').val(task.descr);
	},
	clearAddTaskForm: function (){
		$('#add-task-list-id').val("");
		$('#add-task-name').val("");
		$('#add-task-description').val("");
		$('#add-task-deadline').val("");
	},
	getAddTaskForm: function (){
		var newaddtask = {};
		newaddtask.listid = parseInt($('#add-task-list-id').val());
		newaddtask.name = $('#add-task-name').val();
		var date = $('#add-task-deadline').val().split('-');
		newaddtask.deadline = { "year": date[2], "month": date[1], "day": date[0] };
		console.log(newaddtask.deadline);
		newaddtask.descr = $('#add-task-description').val();
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
		$('#edit-list-id').val("")
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
		$('#edit-group-id').val("")
		$('#edit-group-name').val("");
		$('#edit-group-description').val("");
	},
	getEditGroupForm: function (){
		var neweditgroup = {};
		neweditgroup.id = parseInt($('#edit-group-id').val())
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
	showUsersSettings: function (){
		$('#user-settings').slideDown('fast');
	},
	showAddingListForm: function (){
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
	}
};