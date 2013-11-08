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
	userSettingsButtonClick: function (user){
		$('#user-settings-displayname').val(user.profile.displayName);
		$('#user-settings-givenname').val(user.profile.name.givenName);
		$('#user-settings-middlename').val(user.profile.name.middleName);
		$('#user-settings-familyname').val(user.profile.name.familyName);
		$('#user-settings').slideDown('fast');
	},
	addListButtonClick: function (user){
		$('#adding-lists').slideDown('fast');
	},
	userSettingsFill: function (user){
		$('#user-settings-displayname').val(user.profile.displayName);
		$('#user-settings-givenname').val(user.profile.name.givenName);
		$('#user-settings-middlename').val(user.profile.name.middleName);
		$('#user-settings-familyname').val(user.profile.name.familyName);
	},
	userSettingsSaveClick: function (user){
		var newuser = {id: user.id, "profile": {"name": {}}};
		newuser.profile.displayName = $('#user-settings-displayname').val();
		newuser.profile.name.givenName = $('#user-settings-givenname').val();
		newuser.profile.name.middleName = $('#user-settings-middlename').val();
		newuser.profile.name.familyName = $('#user-settings-familyname').val();
		// console.log(newuser);
		return newuser;
	},
	fillUserListsSmall: function (tab){
		$('#user-lists-small').children().remove();

		for(var i = 0; i < tab.length; i++){
			$('#user-lists-small').append('<tr><td>'+ tab[i].name +'</td><td>'+
				'<button type="button" class="btn btn-link btn-sm pull-right" id="addTask'+ tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Dodaj zadanie</button>'+
				'</td></tr>');
		}
	},
	allListButtonClick: function (tab){
		$('#show-all-lists').slideDown('fast');

		$('#user-lists-big').children().remove();
		$('#user-lists-big').append('<tr><th>Nazwa</th><th>Opis</th><th colspan="3">Opcje</th></tr>');


		for(var i = 0; i < tab.length; i++){
			$('#user-lists-big').append('<tr><td>'+ tab[i].name +'</td><td>'+ tab[i].descr +'</td>'+
				'<td><button type="button" class="btn btn-default btn-sm pull-right editList" id="editList'+ tab[i].id +'">'+
				'<span class="glyphicon glyphicon-edit"></span> Edytuj</button></td>'+
				'<td><button type="button" class="btn btn-danger btn-sm pull-right rmList" id="rmList'+ tab[i].id +'">'+
				'<span class="glyphicon glyphicon-remove"></span> Usuń</button></td>'+
				'<td><button type="button" class="btn btn-primary btn-sm pull-right" id="addTaskBig'+ tab[i].id +'">'+
				'<span class="glyphicon glyphicon-plus"></span> Dodaj zadanie</button></td>'+
				'</tr>');
		}
		//rmList button click
		$('.rmList').click(function () {
			var listId = $(this).attr('id');
			listId = parseInt(listId.substring(6, listId.length));

			for(var i =0; i < tab.length; i++){
				if(tab[i].id === listId){
					$('#user-delete-list-modal-name').text(tab[i].name);
					$('.rmListConfirm').attr('id', 'rmListConfirm' + listId);
					break;
				}
			}

			$("#user-delete-list-modal").modal('show');
		});
		//editList button click
		$('.editList').click(function () {
			var listId = $(this).attr('id');
			listId = parseInt(listId.substring(8, listId.length));

			for(var i =0; i < tab.length; i++){
				if(tab[i].id === listId){
					$('#edit-list-id').val(tab[i].id);
					$('#edit-list-name').val(tab[i].name);
					$('#edit-list-description').val(tab[i].descr);
					$('#show-all-lists').hide();
					$('#editing-lists').show();
					break;
				}
			}
		});
	},
	addListSaveClick: function (user){
		var newlist = { fbid: user.id };
		newlist.name = $('#add-list-name').val();
		$('#add-list-name').val("");
		newlist.descr = $('#add-list-description').val();
		$('#add-list-description').val("");
		return newlist;
	},
	clearAddListForm: function (){
		$('#add-list-name').val("");
		$('#add-list-description').val("");
	},
	clearEditListForm: function (){
		$('#edit-list-id').val("");
		$('#edit-list-name').val("");
		$('#edit-list-description').val("");
	},
	editListSaveClick: function (user){
		var editedList = { fbid: user.id };
		editedList.id = parseInt($('#edit-list-id').val());
		$('#edit-list-id').val("");
		editedList.name = $('#edit-list-name').val();
		$('#edit-list-name').val("");
		editedList.descr = $('#edit-list-description').val();
		$('#edit-list-description').val("");
		return editedList;
	}
};
