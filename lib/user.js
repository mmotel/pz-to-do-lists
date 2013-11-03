module.exports = function(data){
	//object constructor for loggedin user
	var loggedinUser = function(fb_id, session_id, profile){
		this.fbid = fb_id;
		this.sid = session_id;
		return this;
	};

	//array for loggedin users
	var loggedinUsers = [];

	var FindLoggedinUser = function (session_id, callback){
		// var userToReturn = null;
		for(var i = 0; i < loggedinUsers.length; i++){
			if(loggedinUsers[i].sid === session_id){
				data.findUser(loggedinUsers[i].fbid, callback);
				i=-1;
				break;
			}
		}
		if(i === loggedinUsers.length){
			callback(null);
		}
	};

	var AddLoggedinUser = function (session_id, profile, callback){
		var newLoggedinUser = new loggedinUser(profile.id, session_id, profile);
		loggedinUsers.push(newLoggedinUser);
		console.log(loggedinUsers.length);
		console.log(loggedinUsers[loggedinUsers.length-1]);
		data.findOrCreateUser(profile, callback)
		// callback(newLoggedinUser);
	}

	var RemoveLoggedinUser = function (session_id){
		for(var i = 0; i < loggedinUsers.length; i++){
			if(loggedinUsers[i].sid === session_id){
				var fbid = loggedinUsers[i].fbid;
				loggedinUsers.splice(i, 1);
				return fbid;
			}
		}
	}

	var DeleteUser = function (session_id, callback) {
		var fbid = RemoveLoggedinUser(session_id);
		data.removeUser(fbid, callback);
	}

	return {
		login: AddLoggedinUser,
		logout: RemoveLoggedinUser,
		getLogin: FindLoggedinUser,
		removeAccout: DeleteUser
	};

};