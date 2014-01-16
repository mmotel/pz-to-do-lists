var GUI;

$(document).ready(function () {
	'use strict';

	//helper functions
	var findMember = function(members, userid){
		for(var i=0; i < members.length; i++){
			console.log(members[i].id + ' : ' + userid);
			if(members[i].id === userid){
				return members[i].profile.displayName;
			}
		}
		if(i === members.length){
			return 'brak';
		}
	};

	//setting up datepickers for add & edit tash forms
	$('#add-task-deadline').datepicker({
		inline: true, direction: "down", minDate: new Date(), dateFormat: "dd-mm-yy"
	});

	$('#add-task-deadline').datepicker("setDate", new Date());
	$('#edit-task-deadline').datepicker({
		inline: true, direction: "down", minDate: new Date(), dateFormat: "dd-mm-yy"
	});
	$('#edit-task-deadline').datepicker("setDate", new Date());

	//actions with add group/priavate list
	$('input:radio[name=addListType]').change(function (){
		var type = $('input:radio[name=addListType]:checked').val();
		// console.log(type);
		if(type === "group"){
			$('#add-list-select-groups').slideDown('fast');
			GUI.fillPermsListForm();
			GUI.showPermsListForm();
		}
		else{
			$('#add-list-select-groups').slideUp('fast');	
			$('#permissions-lists').slideUp();			
		}
	});

	$('.radio').css({'display': 'inline-table', 'margin': '5px'});
	$('label').css({'display': 'block', 'clear':'both'});

	$('#top-menu').css({'margin-right': '10px'});

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
		$('#settings-button').hide();
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
		$('#permissions-lists').hide();
		$('#permissions-groups').hide();
		$('#show-incoming-tasks').hide();
	},
	fillLoginPanel: function (user){
		console.log("user.id: " + user.id);
		//fill loggedin panel with data
		GUIutils.getSmallFbPic(user.id, 'profile-normal-pic');
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
		$('#settings-button').show();
	},
	showNotLoggedin: function (){
		$('#login-link').show();
		$('#login-panel').show();
	},
	fillUserListsSmall: function (tab, addTaskClick, showListClick, groups, canAddTask, userId){
		$('#user-lists-small').children().remove();

		for(var i = 0; i < tab.length; i++){
			$('#user-lists-small').append('<tr>'+
				'<td><button type="button" class="btn btn-link btn-sm showListSmall"'+
				'id="showList'+ tab[i].id+'">'+ tab[i].name +'</button></td><td>'+
				(tab[i].groupid === null || canAddTask(groups, tab[i], userId) ?
				'<button type="button" class="btn btn-link btn-sm pull-right addTaskSmall"'+
				' id="addTask'+ tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Dodaj zadanie</button>' : '') +
				'</td></tr>');
		}

		//addTaskSmall button click
		$('.addTaskSmall').click(function () { addTaskClick(this); });

		//showList button click
		$('.showListSmall').click(function () { showListClick(this); });
	},
	fillUserGroupsSmall: function (tab, showGroupClick, addListClick, canAddList, userId){
		$('#user-groups-small').children().remove();

		for(var i = 0; i < tab.length; i++){
			$('#user-groups-small').append('<tr>'+
				'<td><button type="button" class="btn btn-link btn-sm showGroupSmall"'+
				'id="showGroup'+ tab[i].id+'">'+ tab[i].name +'</button></td><td>'+
				( canAddList(tab[i], userId) ?
				'<button type="button" class="btn btn-link btn-sm pull-right addListSmall"'+
				' id="addList'+ tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Dodaj liste</button>' : '') +
				'</td></tr>');
		}

		//addGroupSmall button click
		$('.addListSmall').click(function () { addListClick(this); });

		//showGroup button click
		$('.showGroupSmall').click(function () { showGroupClick(this); });
	},
	fillUserAllLists: function (tab, rmClick, editClick, addTaskClick, showListClick, groups, userId, 
		canAddTask, canEditList, canRmList){
		$('#show-all-lists').slideDown('fast');

		$('#user-lists-big').children().remove();
		$('#group-lists-big').children().remove();
		$('#user-lists-big').append('<tr><th>Nazwa</th><th>Opis</th><th>Opcje</th></tr>');

		for(var i = 0; i < tab.length; i++){
			$('#user-lists-big').append('<tr>'+
				'<td><button type="button" class="btn btn-link btn-sm showListBig"'+
				'id="showListBig'+ tab[i].id+'">'+ tab[i].name +'</button></td>'+
				'<td>'+ tab[i].descr +'</td><td><div class="btn-group pull-right">'+
				(tab[i].groupid === null || canEditList(groups, tab[i], userId) ?
				'<button type="button" class="btn btn-default btn-sm editList" id="editList'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-edit"></span> Edytuj</button>' : '') +
				(tab[i].groupid === null || canRmList(groups, tab[i], userId) ?
				'<button type="button" class="btn btn-danger btn-sm rmList" id="rmList'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-remove"></span> Usuń</button>' : '') +
				(tab[i].groupid === null || canAddTask(groups, tab[i], userId) ?
				'<button type="button" class="btn btn-primary btn-sm addTaskAll" id="addTaskBig'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Dodaj zadanie</button>' : '' ) + '</div></td>'+
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
	fillGroupLists: function (tab, rmClick, editClick, addTaskClick, showListClick, groups, userId, 
		canAddTask, canEditList, canRmList){
		$('#user-lists-big').children().remove();
		$('#group-lists-big').children().remove();
		$('#group-lists-big').append('<tr><th>Nazwa</th><th>Opis</th><th>Opcje</th></tr>');

		for(var i = 0; i < tab.length; i++){
			$('#group-lists-big').append('<tr>'+
				'<td><button type="button" class="btn btn-link btn-sm showListBig"'+
				'id="showListBig'+ tab[i].id+'">'+ tab[i].name +'</button></td>'+
				'<td>'+ tab[i].descr +'</td><td><div class="btn-group pull-right">'+
				(tab[i].groupid === null || canEditList(groups, tab[i], userId) ?
				'<button type="button" class="btn btn-default btn-sm editList" id="editList'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-edit"></span> Edytuj</button>' : '') + 
				(tab[i].groupid === null || canRmList(groups, tab[i], userId) ?
				'<button type="button" class="btn btn-danger btn-sm rmList" id="rmList'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-remove"></span> Usuń</button>' : '') +
				(tab[i].groupid === null || canAddTask(groups, tab[i], userId) ?
				'<button type="button" class="btn btn-primary btn-sm addTaskAll" id="addTaskBig'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Dodaj zadanie</button>' : '') + '</div></td>'+
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
	fillUserAllGroups: function (tab, editClick, rmClick, showGroupClick, addListClick, canAddList, userId, 
		canManageGroup){
		$('#show-all-groups').slideDown('fast');

		$('#user-groups-big').children().remove();
		$('#user-groups-big').append('<tr><th>Nazwa</th><th>Opis</th><th>Opcje</th></tr>');

		for(var i = 0; i < tab.length; i++){
			$('#user-groups-big').append('<tr>'+
				'<td><button type="button" class="btn btn-link btn-sm showGroupBig"'+
				'id="showGroupBig'+ tab[i].id+'">'+ tab[i].name +'</button></td>'+
				'<td>'+ tab[i].descr +'</td><td><div class="btn-group pull-right">'+
				( canManageGroup(tab[i], userId) ?
				'<button type="button" class="btn btn-default btn-sm editGroup" id="editGroup'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-edit"></span> Edytuj</button>' : '') +
				( canManageGroup(tab[i], userId) ?
				'<button type="button" class="btn btn-danger btn-sm rmGroup" id="rmGroup'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-remove"></span> Usuń</button>' : '') +
				( canAddList(tab[i], userId) ?
				'<button type="button" class="btn btn-primary btn-sm addListBig" id="addListBig'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Dodaj listę</button>' : '') + 
				'</div></td></tr>');
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
	fillGroupUsers: function (group, tab, rmClick, canAddRmMembers, userId){
		$('#show-groups').slideDown('fast');

		$('#show-group-name').html(group.name);
		$('#show-group-id').val(group.id);

		$('#group-users').children().remove();
		$('#group-users').append('<tr><th></th><th>Nazwa</th><th>Opcje</th></tr>');

		for(var i = 0; i < tab.length; i++){
			$('#group-users').append('<tr><td><img id="fbImg'+tab[i].id+'"></td>'+
				'<td>'+ tab[i].profile.displayName +'</td><td><div class="btn-group pull-right">'+ 
				(canAddRmMembers(group, userId) ? 
				'<button type="button" class="btn btn-danger btn-sm pull-right rmUser" id="rmUser'+ 
					tab[i].id +'"' + ( tab[i].id === group.owner ? 'disabled="disabled"' : ' ' ) + '>'+
				'<span class="glyphicon glyphicon-remove"></span> Usuń z grupy</button>' : '') +
				'</div></td></tr>');
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
				'<td>'+ tab[i].profile.displayName +'</td><td><div class="btn-group pull-right">'+
				'<button type="button" class="btn btn-success btn-sm pull-right addUser" id="addUser'+ 
					tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Dodaj do grupy</button></div></td>'+
				'</tr>');
			GUIutils.getSmallFbPic(tab[i].id, "searchFbImg"+tab[i].id);
		}
		//addUser button click
		$('.addUser').click(function() { addClick(this); });
	},
	fillUserAllTasks: function (list, tab, rmClick, editClick, taskDoneClick, showTaskClick, members, group, 
		userId, canEditTask, canRmTask, canChangeStatusTask){ //<---- !!!
		$('#show-all-tasks-list-name').html(list.name);
		$('#user-tasks-big').children().remove();
		$('#user-tasks-big').append('<tr><th>Nazwa</th><th>Opis</th><th>Termin</th><th>Status</th>'+
			(members ? '<th>Wykonawca</th>' : '') +
			'<th colspan="3">Opcje</th></tr>');

		for(var i = 0; i < tab.length; i++){
			$('#user-tasks-big').append('<tr>' + 
				'<td><button type="button" class="btn btn-link showTask" id="showTask'+tab[i].id+'">' + 
				tab[i].name +'</button></td>' + 
				'<td>'+ tab[i].descr +'</td>'+
				'<td>'+ tab[i].deadline.day + "-"+ tab[i].deadline.month + "-" + tab[i].deadline.year +'</td>'+
				'<td>'+ (tab[i].status === "new" ? 'nowe' : 
					( tab[i].status === "progres" ? 'w toku' : 'wykonane' ) ) +'</td>'+
				(list.groupid !== null ? '<td>'+ findMember(members, tab[i].executor) +'</td>' : '') + '<td>' +
				'<div class="btn-group pull-right">' +
				(list.groupid === null || canEditTask(group, list, tab[i], userId) ? 
				'<button type="button" class="btn btn-default btn-sm editTask" id="editTask'+ 
					tab[i].id +'">'  +
				'<span class="glyphicon glyphicon-edit"></span> Edytuj</button>' : '')+ 
				(list.groupid === null || canRmTask(group, list, tab[i], userId) ?
				'<button type="button" class="btn btn-danger btn-sm rmTask" id="rmTask'+ 
					tab[i].id +'">' + 
				'<span class="glyphicon glyphicon-remove"></span> Usuń</button>': '') +  
				(list.groupid === null || canChangeStatusTask(group, list, tab[i], userId) ?
				'<button type="button" class="btn btn-primary btn-sm taskDone" id="taskDone'+ 
					tab[i].id +'"'+ (tab[i].status === "done" ? 'disabled="disabled"' : ' ') +'>'+
				'<span class="glyphicon glyphicon-ok"></span> Zmień status</button>' : '') + '</div></td></tr>' );
		}
		//showTask button click
		$('.showTask').click(function (){ showTaskClick(this); });

		//rmTask button click
		$('.rmTask').click(function() { rmClick(this); });

		//editTask button click
		$('.editTask').click(function () { editClick(this); });

		//taskDOne button click
		$('.taskDone').click(function () { taskDoneClick(this); });

		$('#show-all-tasks').slideDown('fast');
	},
	fillIncomingTasks: function (tab, showOnListClick, showTaskClick){ //<---- !!!
		$('#incoming-tasks-big').children().remove();
		$('#incoming-tasks-big').append('<tr><th>Nazwa</th><th>Opis</th><th>Termin</th><th>Status</th>'+
			'<th>Opcje</th></tr>');

		for(var i = 0; i < tab.length; i++){
			$('#incoming-tasks-big').append('<tr>' + 
				'<td><button type="button" class="btn btn-link showIncTask" id="showIncTask'+tab[i].id+'">' + 
				tab[i].name +'</button></td>'+
				'<td>'+ tab[i].descr +'</td>'+
				'<td>'+ tab[i].deadline.day + "-"+ tab[i].deadline.month + "-" + tab[i].deadline.year +'</td>'+
				'<td>'+ (tab[i].status === "new" ? 'nowe' : 
					( tab[i].status === "progres" ? 'w toku' : 'wykonane' ) ) +
				'</td><td><div class="btn-group pull-right">'+
				'<button type="button" class="btn btn-primary btn-sm pull-right showOnList" id="showOnList'+ 
					tab[i].listid +'>'+
				'<span class="glyphicon glyphicon-ok"></span> Pokaż na liście</button>' + '</div></td></tr>' );
		}
		//showTask button click
		$('.showIncTask').click(function (){ showTaskClick(this); });

		//showOnList button click
		$('.showOnList').click(function (){ showOnListClick(this); });

		$('#show-incoming-tasks').slideDown('fast');
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
	fillAddListForm: function (groups, canAddList, userId, groupId){
		if(!groupId){
			$('#add-list-type-private').prop('checked', true);
			$('#add-list-select-groups').hide();
		}else{
			$('#add-list-type-group').prop('checked', true);
			$('#add-list-select-groups').show();
		}
		$('#add-list-group').children().remove();

		for(var i=0; i < groups.length; i++){
			if(canAddList(groups[i], userId)){
				$('#add-list-group').append('<option value="'+ groups[i].id +'">'+ groups[i].name +
					'</option>');
			}
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
		$('#adding-lists .form-group').removeClass('has-error');
	},
	getAddListForm: function (){
		var newaddlist = {};
		newaddlist.name = $('#add-list-name').val();
		newaddlist.descr = $('#add-list-description').val();

		$('#adding-lists .form-group').removeClass('has-error');

		var err = false;

		if(newaddlist.name === ""){
			$('#add-list-name').parent().addClass('has-error');
			err = true;
		}

		if($('input:radio[name=addListType]:checked').val() === "private"){
			newaddlist.groupid = null;
		}
		else{
			newaddlist.groupid = parseInt( $('#add-list-group').val() );
			if($('#add-list-group').val() === null){
				$('#add-list-group').parent().addClass('has-error');
				err = true;
			}
		}
		if(err){
			return undefined;
		}else{
			return newaddlist;
		}
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
	},
	clearAddTaskForm: function (){
		$('#add-task-list-id').val(null);
		$('#add-task-group-id').val(null);
		$('#add-task-name').val("");
		$('#add-task-description').val("");
		$('#add-task-deadline').val("");
		$('#add-task-executor').children().remove();
		$('#adding-tasks .form-group').removeClass('has-error');
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

		$('#adding-tasks .form-group').removeClass('has-error');

		var err = false;

		console.log(newaddtask);

		if(newaddtask.name === ""){ 
			$('#add-task-name').parent().addClass('has-error');
			err = true;
		}
		if($('#add-task-deadline').val() === ""){ 
			$('#add-task-deadline').parent().addClass('has-error');
			err = true;
		}
		if($('#add-task-group-id').val() !== "" && newaddtask.executor === null){ 
			$('#add-task-executor').parent().addClass('has-error');
			err = true;
		}

		if(err){
			return undefined;
		}else{
			return newaddtask;
		}
	},
	fillEditTaskForm: function (task, groupId, members){
		$('#edit-task-id').val(task.id);
		$('#edit-task-list-id').val(task.listid);
		$('#edit-task-name').val(task.name);
		var date = task.deadline;
		var dateString = date.day + "-" + date.month + "-" + date.year;
		$('#edit-task-deadline').datepicker( "setDate" , dateString);
		$('#edit-task-description').val(task.descr);
		// if(task.status === "new"){ $('#edit-task-status-new').prop('checked', true); }
		// else if(task.status === "progres"){ $('#edit-task-status-progres').prop('checked', true); }
		// else if(task.status === "done"){ $('#edit-task-status-done').prop('checked', true); }

		$('#edit-task-group-id').val(groupId);
		$('#edit-task-executor').children().remove();
		if(members){

			for(var i=0; i < members.length; i++){
				$('#edit-task-executor').append('<option value="'+ members[i].id +'"'+
					(task.executor === members[i].id ? ' selected' : ' ') +'>'+
					members[i].profile.displayName +'</option>');
			}
			$('#edit-task-select-executor').show();
		}
		else{
			$('#edit-task-select-executor').hide();
		}
	},
	clearEditTaskForm: function (){
		$('#edit-task-id').val(null);
		$('#edit-task-list-id').val(null);
		$('#edit-task-group-id').val(null);
		$('#edit-task-name').val("");
		$('#edit-task-deadline').val("");
		$('#edit-task-description').val("");
		// $('#edit-task-status-new').prop('checked', true);
		$('#edit-task-executor').children().remove();
		$('#editing-tasks .form-group').parent().removeClass('has-error');
	},
	getEditTaskForm: function (){
		var editedtask = {};
		editedtask.listid = parseInt($('#edit-task-list-id').val());
		editedtask.groupid = parseInt($('#edit-task-group-id').val());
		editedtask.id = parseInt($('#edit-task-id').val());
		editedtask.name = $('#edit-task-name').val();
		var date = $('#edit-task-deadline').val().split('-');
		editedtask.deadline = { "year": date[2], "month": date[1], "day": date[0] };
		// editedtask.status = $( "input:radio[name=editTaskStatus]:checked").val();
		editedtask.descr = $('#edit-task-description').val();
		editedtask.executor = $('#edit-task-executor').val();

		$('#editing-tasks .form-group').parent().removeClass('has-error');

		var err = false;

		if(editedtask.name === ""){
			$('#edit-task-name').parent().addClass('has-error');
			err = true;
		}
		if($('#edit-task-deadline').val() === ""){
			$('#edit-task-deadline').parent().addClass('has-error');
			err = true;
		}
		if($('#edit-task-group-id').val() !== "" && editedtask.executor === null){
			$('#edit-task-executor').parent().addClass('has-error');
			err = true;
		}

		if(err){
			return undefined;
		}else{
			return editedtask;
		}
	},
	fillEditListForm: function (list){
		$('#edit-list-id').val(list.id);
		$('#edit-list-groupid').val(list.groupid);
		$('#edit-list-name').val(list.name);
		$('#edit-list-description').val(list.descr);
	},
	clearEditListForm: function (){
		$('#edit-list-id').val(null);
		$('#edit-list-groupid').val(null);
		$('#edit-list-name').val("");
		$('#edit-list-description').val("");
		$('#editing-lists .form-group').removeClass('has-error');
	},
	getEditListForm: function (){
		var neweditlist = {};
		neweditlist.id = parseInt($('#edit-list-id').val());
		neweditlist.groupid = parseInt($('#edit-list-groupid').val());
		neweditlist.name = $('#edit-list-name').val();
		neweditlist.descr = $('#edit-list-description').val();

		$('#editing-lists .form-group').removeClass('has-error');

		var err = false;

		if(neweditlist.name === ""){
			$('#edit-list-name').parent().addClass('has-error');
			err = true;
		}

		if(err){
			return undefined;
		}else{
			return neweditlist;
		}
	},
	fillAddGroupForm: function (group){
		// $('#add-group-name').val(group.name);
		// $('#add-group-description').val(group.descr);
	},
	clearAddGroupForm: function (){
		$('#add-group-name').val("");
		$('#add-group-description').val("");
		$('#add-group-name').parent().removeClass('has-error'); //<<---!
	},
	getAddGroupForm: function (){
		var newaddgroup = {};
		newaddgroup.name = $('#add-group-name').val();
		newaddgroup.descr = $('#add-group-description').val();

		var error = false; //<<----!

		if(newaddgroup.name === ""){
			$('#add-group-name').parent().addClass('has-error');
			error = true;
		}

		if(error){ return undefined; }
		else { return newaddgroup; }
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
		$('#edit-group-name').parent().removeClass('has-error');
	},
	getEditGroupForm: function (){
		var neweditgroup = {};
		neweditgroup.id = parseInt($('#edit-group-id').val());
		neweditgroup.name = $('#edit-group-name').val();
		neweditgroup.descr = $('#edit-group-description').val();

		var err = false;

		if(neweditgroup.name === ""){
			$('#edit-group-name').parent().addClass('has-error');
			err = true;
		}

		if(err){
			return undefined;
		}else{
			return neweditgroup;
		}
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

		if(task.status === "new"){ $('#task-status-new').prop('checked', true); }
		else if(task.status === "progres"){ $('#task-status-progres').prop('checked', true); }
		else if(task.status === "done"){ $('#task-status-done').prop('checked', true); }
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
		var status = $('input:radio[name=taskStatus]:checked').val();
		var comment = $('#tast-status-comment').val();
		return {"id": taskId, "listid": listId, "status": status, "comment": comment};
	},
	getDeleteGroupModal: function (){
		var groupId = parseInt($('#user-delete-group-modal-id').val());
		return groupId;
	},
	fillPermsListForm: function (perms){
		if(!perms){
			$('#perm-list-add-private').prop('checked', true);
			$('#perm-list-edit-private').prop('checked', true);
			$('#perm-list-rm-private').prop('checked', true);
			$('#perm-list-status-private').prop('checked', true);
		}
		else{
			if(perms.addTask){ $('#perm-list-add-private').prop('checked', true); }
				else{ $('#perm-list-add-group').prop('checked', true); }
			if(perms.editTask){ $('#perm-list-edit-private').prop('checked', true); }
				else{ $('#perm-list-edit-group').prop('checked', true); }
			if(perms.rmTask){ $('#perm-list-rm-private').prop('checked', true); }
				else{ $('#perm-list-rm-group').prop('checked', true); }
			if(perms.status){ $('#perm-list-status-private').prop('checked', true); }
				else{ $('#perm-list-status-group').prop('checked', true); }
		}
	},
	clearPermsListForm: function (){
		$('#perm-list-add-private').prop('checked', true);
		$('#perm-list-edit-private').prop('checked', true);
		$('#perm-list-rm-private').prop('checked', true);
		$('#perm-list-status-private').prop('checked', true);
	},
	getPermsListForm: function (){
		var perms = {};
		perms.addTask = ($('input:radio[name=permListAdd]:checked').val() === 'private');
		perms.editTask = ($('input:radio[name=permListEdit]:checked').val() === 'private');
		perms.rmTask = ($('input:radio[name=permListRm]:checked').val() === 'private');
		perms.status = ($('input:radio[name=permListStatus]:checked').val() === 'private');
		return perms;
	},
	fillPermsGroupForm: function (perms){
		if(!perms){
			$('#perm-group-add-rm-user-private').prop('checked', true);
			$('#perm-group-add-private').prop('checked', true);
			$('#perm-group-edit-private').prop('checked', true);
			$('#perm-group-rm-private').prop('checked', true);
		}
		else{
			if(perms.addRmMembers){ $('#perm-group-add-rm-user-private').prop('checked', true); }
				else{ $('#perm-group-add-rm-user-group').prop('checked', true); }
			if(perms.addList){ $('#perm-group-add-private').prop('checked', true); }
				else{ $('#perm-group-add-group').prop('checked', true); }
			if(perms.editList){ $('#perm-group-edit-private').prop('checked', true); }
				else{ $('#perm-group-edit-group').prop('checked', true); }
			if(perms.rmList){ $('#perm-group-rm-private').prop('checked', true); }
				else{ $('#perm-group-rm-group').prop('checked', true); }
		}
	},
	clearPermsGroupForm: function (){
		$('#perm-group-add-rm-user-private').prop('checked', true);
		$('#perm-group-add-private').prop('checked', true);
		$('#perm-group-edit-private').prop('checked', true);
		$('#perm-group-rm-private').prop('checked', true);
	},
	getPermsGroupForm: function (){
		var perms = {};
		perms.addRmMembers = ($('input:radio[name=permGroupAddRmUser]:checked').val() === 'private');
		perms.addList = ($('input:radio[name=permGroupAdd]:checked').val() === 'private');
		perms.editList = ($('input:radio[name=permGroupEdit]:checked').val() === 'private');
		perms.rmList = ($('input:radio[name=permGroupRm]:checked').val() === 'private');
		return perms;
	},
	fillShowTaskModal: function (task, members){
		$('#show-task-modal-name').html(task.name);
		$('#show-task-modal-deadline').html(task.deadline.day + '.' + task.deadline.month + '.' + 
			task.deadline.year);
		if(members){
			$('#show-task-modal-executor').html(findMember(members, task.executor));
		}
		else{
			$('#show-task-modal-executor-tr').hide();
		}
		$('#show-task-modal-descr').html(task.descr);
		if(task.status === "new"){
			$('#show-task-modal-status').html('nowe');
		}
		else if(task.status === "progres"){
			$('#show-task-modal-status').html('w toku');			
		}
		else if(task.status === "done"){
			$('#show-task-modal-status').html('wykoane');			
		}

		for(var i = task.statusChanges.length -1; i >= 0; i--){
			$('#show-task-lifecycle').append('<div class="panel ' + 
				( task.statusChanges[i].status === "new" ? 'panel-primary' :
					( task.statusChanges[i].status === "progres" ? 'panel-default' :
					'panel-danger' ) ) + 
				'">' +
			  '<div class="panel-body">' +
			    '<b>Status:</b> ' +
			    ( task.statusChanges[i].status === "new" ? 'nowe' : 
			    ( task.statusChanges[i].status === "progres" ? 'w toku' : "wykonane" ) ) + '<br/>' +
			    '<b>Komentarz:</b> ' + task.statusChanges[i].comment + '' +
			  '</div>' +
			  '<div class="panel-footer">' + 
			  task.statusChanges[i].date.day + '.' + task.statusChanges[i].date.month + '.' +
			  task.statusChanges[i].date.year + ' ' + task.statusChanges[i].date.hours + ':' +
			  task.statusChanges[i].date.mins +
			  (members ? (', ' + findMember(members, task.statusChanges[i].fbid) ) : '' ) +
			  '</div>' +
			'</div>');
		}
	},
	clearShowTaskModal: function (){
		$('#show-task-modal-name').html("");
		$('#show-task-modal-deadline').html("");
		$('#show-task-modal-executor').html("");
		$('#show-task-modal-executor-tr').show();
		$('#show-task-modal-descr').html("");
		$('#show-task-modal-status').html("");
		$('#show-task-lifecycle').children().remove();
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
	},
	showPermsListForm: function (){
		$('#permissions-lists').slideDown();
	},
	showPermsGroupForm: function (){
		$('#permissions-groups').slideDown();
	},
	showShowTaskModal: function (){
		$('#show-task-modal').modal();
	}
};

});
