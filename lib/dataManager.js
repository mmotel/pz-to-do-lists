module.exports = function (Data){

  //external methods definitions
  var FindUser = function (id, callback){
    Data.findData("appUsers", {"id": id}, callback);
  };

  var CreateUser = function (profile, callback){
    Data.insertData("appUsers",new User(profile) ,callback);
  };

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
  };
  
  var UpdateUser = function(newProfile, callback){
    Data.updateData("appUsers", {"id": newProfile.id}, {"profile": newProfile.profile}, callback);
  };

  var RemoveUser = function(id, callback){
    Data.removeData("appUsers", {"id": id}, callback);
  };

  var AddList = function(newList, callback){
    Data.insertData("appLists", 
    	new List(genId(), newList.fbid, newList.name, newList.descr), callback);
  };

  var UpdateList = function(newList, callback){
    Data.updateData("appLists", {"id": newList.id}, {"name": newList.name, "descr": newList.descr}, 
      callback);
  };

  var RemoveList = function(id, callback){
    Data.removeData("appLists", {"id": id}, callback);
  };

  var RemoveAllLists = function(fbid, callback){
    Data.removeAllData("appLists", {"fbid": fbid}, {"trash": true}, callback);
  };

  var FindList = function (id, callback){
    Data.findData("appLists", {"id": id}, callback);
  };

  var FindAllLists = function (fbid, callback){
    Data.findAllData("appLists", {"fbid": fbid}, callback);
  };

  var AddTask = function(newTask, callback){
    Data.insertData("appTasks", 
      new Task(genId(), newTask.fbid, newTask.listid, newTask.name, newTask.descr, newTask.deadline), 
        callback);
  };

  var FindTask = function(id, callback){
    Data.findData("appTasks", {"id": id}, callback);
  };

  var FindAllTasks = function(listid, callback){
    Data.findAllData("appTasks", {"listid": listid}, callback);
  };

  var UpdateTask = function(newTask, callback){
    Data.updateData("appTasks", {"id": newTask.id}, 
      {"name": newTask.name, "descr": newTask.descr, "deadline": newTask.deadline, 
        "status": newTask.status}, callback);
  };

  var RemoveTask = function(id, callback){
    Data.removeData("appTasks", {"id": id}, callback);
  };

  var RemoveAllListTasks = function(listid, callback){
    Data.removeAllData("appTasks", {"listid": listid}, {"trash": true}, callback);
  };

  var RemoveAllUserTasks = function(fbid, callback){
    Data.removeAllData("appTasks", {"fbid": fbid}, {"trash": true}, callback);
  };

  return {
  	createUser: CreateUser,
  	updateUser: UpdateUser,
  	findUser: FindUser,
  	removeUser: removeUser,
  	findOrCreateUser: findOrCreateUser,
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
  }

};