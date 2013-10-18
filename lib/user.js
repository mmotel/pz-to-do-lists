module.exports = function(data){
	//object constructor for loggedin user
	var loggedinUser = function(fb_id, session_id, profile){
		this.fbid = fb_id;
		this.sid = session_id;
		this.profile = profile; //only temp solution >>> data.findOrCreateUser(...)
		return this;
	};

	//array for loggedin users
	var loggedinUsers = [];

	var findLoggedinUser = function (session_id){
		var userToReturn = null;
		for(var i = 0; i < loggedinUsers.length; i++){
			if(loggedinUsers[i].sid === session_id){
				userToReturn = loggedinUsers[i];
			}
		}
		return userToReturn;
	};

	var addLoggedinUser = function (session_id, profile){
		loggedinUsers.push(new loggedinUser(profile.id, session_id, profile));
		console.log(loggedinUsers.length);
		console.log(loggedinUsers[loggedinUsers.length-1]);
	}

	var removeLoggedinUser = function (session_id){
		for(var i = 0; i < loggedinUsers.length; i++){
			if(loggedinUsers[i].sid === session_id){
				loggedinUsers.splice(i, 1);
			}
		}
	}

	return {
		login: function (session_id, profile){
			addLoggedinUser(session_id, profile);
		},
		logout: function (session_id){
			removeLoggedinUser(session_id);
		},
		getLogin: function (session_id){
			var user = findLoggedinUser(session_id);
			return user;
		}
	};

};