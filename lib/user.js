module.exports = function(Data){

	//"array" for loggedin users
	var loggedinUsers = {};

	var FindLoggedinUser = function (session_id, callback){
		if(loggedinUsers[session_id]){
			Data.findUser(loggedinUsers[session_id], function (user) {
				var dataToSend = {};
				dataToSend.user = user;
				Data.findAllLists(user.id, function (lists) {
					dataToSend.lists = lists;
					callback(dataToSend);
				});
			});
		}
		else {
			callback(null);
		}
	};

	var AddLoggedinUser = function (session_id, profile, callback){
		loggedinUsers[session_id] = profile.id;
		console.log(session_id + " : " + loggedinUsers[session_id]);
		Data.findOrCreateUser(profile, callback);
	};

	var RemoveLoggedinUser = function (session_id){
		if(loggedinUsers[session_id]){
			var fbid = loggedinUsers[session_id];
			delete loggedinUsers[session_id];
			return fbid;
		}
		else{
			return null;
		}
	};

	var DeleteUser = function (session_id, callback) {
		var fbid = RemoveLoggedinUser(session_id);
		Data.removeUser(fbid, callback);
	};

	var CheckLogin = function (session_id){
		if(loggedinUsers[session_id]){
			return loggedinUsers[session_id];
		}else{
			return null;
		}
	};

	return {
		login: AddLoggedinUser,
		logout: RemoveLoggedinUser,
		getLogin: FindLoggedinUser,
		removeAccount: DeleteUser,
		checkLogin: CheckLogin
	};

};