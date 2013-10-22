module.exports = function(){

	var mongo = require('mongodb');

	var User = function(profile){
		this.fb_id = profile.id;
		this.profile.displayName = profile.displayName;
		this.profile.name.familyName = profile.name.familyName;
		this.profile.name.givenName = profile.name.givenName;
		this.profile.name.middleName = profile.name.middleName;
		return this;
	}

	var dbc = new mongo.Db('test', new mongo.Server('localhost', 27017), {safe: true});

	dbc.open(function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log("MongoDB connected!");
			dbc.close();
			console.log("MongoDB disconnected!");
		}
	});


	return {
		findOrCreateUser: function (){

		},
		updateUser: function (){

		},
		removeUser: function (){

		}
	};

};