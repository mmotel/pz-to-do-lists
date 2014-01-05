module.exports = function (Data){

	//data models
	var User = function(profile){
		this.id = profile.id;
		this.profile = {};
		this.profile.displayName = profile.displayName;
		this.profile.name = {};
		this.profile.name.familyName = profile.name.familyName;
		this.profile.name.givenName = profile.name.givenName;
		this.profile.name.middleName = profile.name.middleName;
		this.trash = false;
		return this;
	};

	var List = function(id, fbid, groupid, name, descr,perms){
		this.id = id;
		this.fbid = fbid;
		this.groupid = groupid;
		this.name = name;
		this.descr = descr;
		this.perms = perms || null;
		this.trash = false;
		return this;
	};

	var Task = function(id, fbid, listid, groupid, name, descr, deadline, executor){
		this.id = id;
		this.fbid = fbid;
		this.listid = listid;
		this.groupid = groupid;
		this.name = name;
		this.descr = descr;
		this.deadline = deadline;
		this.executor = executor;
		this.status = false;
		this.trash = false;
		return this;
	};

	var Group = function(id, owner, name, descr){
		this.id = id;
		this.owner = owner;
		this.name = name;
		this.descr = descr;
		this.members = [ {"fbid": owner }];
		this.trash = false;
		return this;
	};

	//helper functions
	var genId = function(){
		var t = new Date();
		var id = t.getTime();
		return id;
	};

	//external methods definitions
	var FindUser = function (id, callback){
		Data.findData("appUsers", {"id": id}, callback);
	};

	var CreateUser = function (profile, callback){
		Data.insertData("appUsers", new User(profile), callback);
	};

	var FindOrCreateUser = function (profile, callback){
		FindUser(profile.id, function (err, user){
			if(!err && user !== null){
				// console.log("found it!");
				callback(undefined, user);
			}
			else{
				CreateUser(profile, function (err, user){
					if(!err){
						// console.log("created it!");
						callback(undefined, user);
					}else{
						callback(err, undefined);
					}
				});
			}
		});
	};
	
	var UpdateUser = function(newProfile, callback){
		Data.updateData("appUsers", {"id": newProfile.id}, { $set: {"profile": newProfile.profile} }, callback);
	};

	var RemoveUser = function(id, callback){
		Data.removeData("appUsers", {"id": id}, callback);
	};

	var AddList = function(newList, callback){
		Data.insertData("appLists", 
			new List(genId(), newList.fbid, newList.groupid, newList.name, newList.descr, newList.perms),
			callback);
	};

	var UpdateList = function(newList, callback){
		Data.updateData("appLists", 
			{"id": newList.id}, 
			{ $set: {"name": newList.name, "descr": newList.descr, "perms": newList.perms} }, 
			callback);
	};

	var RemoveList = function(id, callback){
		Data.removeData("appLists", {"id": id}, callback);
	};

	var RemoveAllLists = function(fbid, callback){
		Data.removeAllData("appLists", {"fbid": fbid}, callback);
	};

	var FindList = function (id, callback){
		Data.findData("appLists", {"id": id}, callback);
	};

	var FindAllLists = function (fbid, callback){
		Data.findAllData("appLists", {"fbid": fbid, "groupid": null}, function (err, privateLists){
			if(err){ callback(err, undefined); }
			else{
				FindUserGroupsLists(fbid, function (err, groupsLists){
					if(err){ callback(err, undefined); }
					else{
						var lists = privateLists.concat(groupsLists);
						callback(undefined, lists);
					}
				});
			}
		});
	};

	var AddTask = function(newTask, callback){
		Data.insertData("appTasks", 
			new Task(genId(), newTask.fbid, newTask.listid, newTask.groupid, newTask.name, newTask.descr, 
				newTask.deadline, newTask.executor), callback);
	};

	var FindTask = function(id, callback){
		Data.findData("appTasks", {"id": id}, callback);
	};

	var FindAllTasks = function(listid, callback){
		Data.findAllData("appTasks", {"listid": listid}, callback);
	};

	var UpdateTask = function(newTask, callback){
		Data.updateData("appTasks", {"id": newTask.id}, 
			{ $set: {"name": newTask.name, "descr": newTask.descr, "deadline": newTask.deadline, 
				"status": newTask.status, "executor": newTask.executor} }, callback);
	};

	var RemoveTask = function(id, callback){
		Data.removeData("appTasks", {"id": id}, callback);
	};

	var RemoveAllListTasks = function(listid, callback){
		Data.removeAllData("appTasks", {"listid": listid}, callback);
	};

	var RemoveAllUserTasks = function(fbid, callback){
		Data.removeAllData("appTasks", {"fbid": fbid}, callback);
	};

	var MakeTaskDone = function(id, callback){
		Data.updateData("appTasks", {"id": id}, { $set: {"status": true} }, callback);
	};

	var CreateGroup = function (newGroup, callback){
		Data.insertData("appGroups", new Group(genId(), newGroup.owner, newGroup.name, newGroup.descr), callback);
	};

	var FindGroup = function (id, callback) {
		Data.findData("appGroups", {"id": id}, callback);
	};

	var RemoveGroup = function (id, callback){
		Data.removeData("appGroups", {"id": id}, callback);
	};

	var FindAllGroups = function (fbid, callback){
		Data.findAllData("appGroups", { "members": { $elemMatch: {"fbid": fbid }} }, callback);
	};

	var UpdateGroup = function (newGroup, callback){
		Data.updateData("appGroups", {"id": newGroup.id},
			{ $set: {"name": newGroup.name, "descr": newGroup.descr} }, callback);
	};

	var AddUserToGroup = function (fbid, groupId, callback){
		Data.updateData("appGroups", {"id": groupId},
			{ $addToSet: { "members": { $each: [ {"fbid": fbid} ] } } }, callback);
	};

	var RemoveUserFromGroup = function (fbid, groupId, callback){
		Data.updateData("appGroups", {"id": groupId},
			  { $pull: { "members": {"fbid": fbid} } }, callback);
	};

	var FindGroupMembers = function (ids, callback){
		var tab = [];
		for(var i=0; i < ids.length; i++){
			tab.push(ids[i].fbid);
		}

		Data.findAllData("appUsers", {"id": { $in: tab } }, callback);
	};

	var SearchUsers = function (query, callback){
		query = query.toLowerCase();
		var re = new RegExp(query,"i");
		Data.findAllData("appUsers",{ "profile.displayName": re}, callback);
	};

	var FindUserGroupsLists = function(fbid, callback){
		FindAllGroups(fbid, function (err, groups){
			if(err){ callback(err, undefined); }
			else{
				var groupsids = [];
				for(var i =0; i < groups.length; i++){
					groupsids.push(groups[i].id);
				}
				Data.findAllData("appLists", {"groupid": { $in: groupsids } }, callback);	
			}
		});
	};

	var FindGroupLists = function (groupid, callback){
		Data.findAllData("appLists", {"groupid": groupid}, callback);
	};

	return {
		createUser: CreateUser,
		updateUser: UpdateUser,
		findUser: FindUser,
		removeUser: RemoveUser,
		findOrCreateUser: FindOrCreateUser,
		addList: AddList,
		updateList: UpdateList,
		findList: FindList,
		findAllLists: FindAllLists,
		removeList: RemoveList,
		removeAllLists: RemoveAllLists,
		removeAllListTasks: RemoveAllListTasks,
		addTask: AddTask,
		updateTask: UpdateTask,
		findTask: FindTask,
		findAllTasks: FindAllTasks,
		removeTask: RemoveTask,
		removeAllUserTasks: RemoveAllUserTasks,
		makeTaskDone: MakeTaskDone,
		createGroup: CreateGroup,
		findGroup: FindGroup,
		removeGroup: RemoveGroup,
		findAllGroups: FindAllGroups,
		updateGroup: UpdateGroup,
		addUserToGroup: AddUserToGroup,
		removeUserFromGroup: RemoveUserFromGroup,
		findGroupMembers: FindGroupMembers,
		searchUsers: SearchUsers,
		findUserGroupsLists: FindUserGroupsLists,
		findGroupLists: FindGroupLists
	};

};