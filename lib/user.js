module.exports = function(data){

	var loggedinUser = function(fb_id, session_id, profile){
		this.fbid = fb_id;
		this.sid = session_id;
		return this;
	}

	var loggedinUsers = [];

	return {
		login: function(profile, session_id){

		},
		logout: function(session_id){

		},
		getLogin: function(session_id){
			
		}
	};

};