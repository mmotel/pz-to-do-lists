var GUI = {
	hideLogin: function() {
		$('#login-link').hide();
		$('#logout-link').hide();
		$('#login-panel').hide();
		$('#loggedin-panel').hide();
	},
	hideAll: function () {
		$('#user-settings').hide();
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
	}
};
