module.exports = function(){

	var mongo = require('mongodb');

	var User = function(profile){
		this.fb_id = profile.id;
		this.profile = {};
		this.profile.displayName = profile.displayName;
		this.profile.name = {};
		this.profile.name.familyName = profile.name.familyName;
		this.profile.name.givenName = profile.name.givenName;
		this.profile.name.middleName = profile.name.middleName;
		return this;
	}

	var dbc = new mongo.Db('test', new mongo.Server('localhost', 27017), {safe: true});

	var FindUser = function (fb_id, callback){
		dbc.open(function (err){
			if(err) {
				console.log(err);
			}
			else{
				console.log("MongoDB connected!");
				dbc.collection('appUsers', function (err, coll) {
					if(err){
						dbc.close();
						console.log("MongoDB disconnected!");
						console.log(err);
					}
					else{
						coll.findOne({"fb_id": fb_id}, function (err, item){
							if(err){
								dbc.close();
								console.log("MongoDB disconnected with err!");
								console.log(err);
								callback(undefined);
							}
							else{
								dbc.close();
								console.log("MongoDB disconnected!");
								callback(item); //object or null if object doesn't exists in db
							}
						});
					}
	  			});
			}
		});
	}

	var CreateUser = function (profile, callback){
		dbc.open(function (err){
			if(err) {
				console.log(err);
			}
			else{
				console.log("MongoDB connected!");
				dbc.collection('appUsers', function (err, coll) {
					if(err){
						dbc.close();
						console.log("MongoDB disconnected!");
						console.log(err);
					}
					else{
						var userToInsert = new User(profile);
						coll.insert(userToInsert, function (err, item){
							if(err){
								dbc.close();
								console.log("MongoDB disconnected with err!");
								console.log(err);
								callback(undefined);
							}
							else{
								dbc.close();
								console.log("MongoDB disconnected!");
								callback(item); //user object from db
							}
						});
					}
	  			});
			}
		});
	}

	var FindOrCreateUser = function (profile, callback){
		FindUser(profile.id, function (user){
			if(user !== null){
				console.log("found it!");
				callback(user);
			}
			else{
				CreateUser(profile, function (user){
					console.log("created it!");
					callback(user);
				});
			}
		});
	}

	// findOrCreateUserDef(profile, function (user){
	// 	console.log(user);
	// });


	return {
		findUser: function(fb_id){
		},
		findOrCreateUser: function (profile, callback){

		},
		updateUser: function (newProfile, callback){

		},
		removeUser: function (fb_id, callback){

		}
	};

};