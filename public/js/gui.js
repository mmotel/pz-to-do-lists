var GUI = {
	hideLogin: function() {
		$('#login-link').hide();
		$('#logout-link').hide();
		$('#login-panel').hide();
		$('#loggedin-panel').hide();
		$('#user-lists-small-panel').hide();
		$('#add-list-button').hide();
		$('#show-all-lists-button').hide();
	},
	hideAll: function () {
		$('#user-settings').hide();
		$('#adding-lists').hide();
		$('#editing-lists').hide();
		$('#show-all-lists').hide();
		$('#show-all-tasks').hide();
		$('#editing-tasks').hide();
		$('#adding-tasks').hide();
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
		$('#user-lists-small-panel').show();
		$('#add-list-button').show();
		$('#show-all-lists-button').show();
	},
	showNotLoggedin: function (){
		$('#login-link').show();
		$('#login-panel').show();
	},
	fillUserListsSmall: function (tab, addTaskClick){
		$('#user-lists-small').children().remove();

		for(var i = 0; i < tab.length; i++){
			$('#user-lists-small').append('<tr><td>'+ tab[i].name +'</td><td>'+
				'<button type="button" class="btn btn-link btn-sm pull-right addTaskSmall" id="addTask'+ tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Dodaj zadanie</button>'+
				'</td></tr>');
		}

		//addTaskSmall button click
		$('.addTaskSmall').click(function () { addTaskClick(this); });
	},
	fillUserAllLists: function (tab, rmClick, editClick, addTaskClick){
		$('#show-all-lists').slideDown('fast');

		$('#user-lists-big').children().remove();
		$('#user-lists-big').append('<tr><th>Nazwa</th><th>Opis</th><th colspan="3">Opcje</th></tr>');

		for(var i = 0; i < tab.length; i++){
			$('#user-lists-big').append('<tr><td>'+ tab[i].name +'</td><td>'+ tab[i].descr +'</td>'+
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
	},
	fillUserAllTasks: function (tab, rmClick, editClick, addTaskClick){
		$('#show-all-tasks').slideDown('fast');

		$('#user-tasks-big').children().remove();
		$('#user-tasks-big').append('<tr><th>Nazwa</th><th>Opis</th><th>Termin</th><th>Status</th>'+
			'<th colspan="3">Opcje</th></tr>');

		for(var i = 0; i < tab.length; i++){
			$('#user-tasks-big').append('<tr><td>'+ tab[i].name +'</td><td>'+ tab[i].descr +'</td>'+
				'<td>'+ tab[i].deadline.getDay() + '.' + tab[i].deadline.getMonth() + '.' + 
				tab[i].deadline.getYear() +'</td>'+
				'<td>'+ (tab[i].status ? 'wykonane' : 'nie wykonane') +'</td>'+
				'<td><button type="button" class="btn btn-default btn-sm pull-right editTask" id="editList'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-edit"></span> Edytuj</button></td>'+
				'<td><button type="button" class="btn btn-danger btn-sm pull-right rmTask" id="rmList'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-remove"></span> Usuń</button></td>'+
				'<td><button type="button" class="btn btn-primary btn-sm pull-right taskDone" id="taskDone'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Wykonaj</button></td>'+
				'</tr>');
		}
		//rmList button click
		$('.rmTask').click(function() { rmClick(this); });

		//editList button click
		$('.editTask').click(function () { editClick(this); });

		//addListAll button click
		$('.taskDone').click(function () { taskDoneClick(this); });
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
	},
	getAddTaskForm: function (){
		var newaddtask = {};
		newaddtask.listid = $('#add-task-list-id').val();
		newaddtask.name = $('#add-task-name').val();
		newaddtask.deadline = $('#add-task-deadline').val();
		newaddtask.descr = $('#add-task-description').val();
		return newaddtask;
	},
	fillEditTaskForm: function (task, list){
		$('#edit-task-id').val(task.id);
		$('#edit-task-list-id').val(list.id);
		$('#edit-task-name').val(task.name);
		$('#edit-task-deadline').val(task.deadline);
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
		editedtask.listid = $('#edit-task-list-id').val();
		editedtask.id = $('#edit-task-id').val();
		editedtask.name = $('#edit-task-name').val();
		editedtask.deadline = $('#edit-task-deadline').val();
		editedtask.descr = $('#edit-task-description').val();
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
	fillDeleteListModal: function (list){
		$('#user-delete-list-modal-id').val(list.id);
		$('#user-delete-list-modal-name').text("Nazwa listy: " + list.name);
	},
	fillDeleteTaskModal: function (task){
		$('#user-delete-task-modal-id').val(task.id);
		$('#user-delete-task-modal-name').text("Nazwa listy: " + task.name);
	},
	fillDoneTaskModal: function (task){
		$('#user-done-task-modal-id').val(task.id);
		$('#user-done-task-modal-name').text("Nazwa listy: " + task.name);
	},
	getDeleteListModal: function (){
		var listId = parseInt($('#user-delete-list-modal-id').val());
		return listId;
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
	showDeleteAccountModal: function (){
		$('#user-delete-account-modal').modal('show');
	},
	showDeleteListModal: function (){
		$('#user-delete-list-modal').modal('show');
	},
	showDeleteTaskModal: function (){
		$('#user-delete-task-modal').modal('show');
	},
	showDoneListModal: function (){
		$('#user-done-task-modal').modal('show');
	}
};