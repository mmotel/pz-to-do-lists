//module.exports = function(){

  var mongo = require('mongodb');

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

  var List = function(id, fbid, name, descr, trash){
    this.id = id;
    this.fbid = fbid;
    this.name = name;
    this.descr = descr;
    this.trash = false;
    return this;
  };

  var Task = function(id, fbid, listid, name, descr, deadline, status, trash){
    this.id = id;
    this.fbid = fbid;
    this.listid = listid;
    this.name = name;
    this.descr = descr;
    this.deadline = deadline;
    this.status = false;
    this.trash = false;
    return this;
  };

  var genId = function(){
    var t = new Date();
    var id = t.getTime();
    return id;
  };

  var dbc = new mongo.Db('test', new mongo.Server('localhost', 27017), {safe: true});

  var insertData = function (collName, data, callback){
    dbc.open(function (err){
      if(err){
        console.log(err);
        dbc.close();
        console.log("MongoDB disconnected with err!");
      }
      else{
        console.log("MongoDB connected!");
        dbc.collection(collName, function(err, coll){
          if(err){
            dbc.close();
            console.log("MongoDB disconnected with err!");
            console.log(err);
          }
          else{
            coll.insert(data, function(err, item){
              if(err){
                dbc.close();
                callback(null);
                console.log("MongoDB disconnected with err!");
                console.log(err);
              }
              else{
                dbc.close();
                callback(item[0]);
                console.log("MongoDB disconnected!");
              }
            });
          }
        });
      }
    });
  };

  var removeData = function (collName, query, data, callback){
    dbc.open(function (err){
      if(err){
        console.log(err);
        dbc.close();
        console.log("MongoDB disconnected with err!");
      }
      else{
        console.log("MongoDB connected!");
        dbc.collection(collName, function(err, coll){
          if(err){
            dbc.close();
            console.log("MongoDB disconnected with err!");
            console.log(err);
          }
          else{
            coll.update(query, {$set: {"trash": true}}, function(err, item){
              if(err){
                dbc.close();
                callback(null);
                console.log("MongoDB disconnected with err!");
                console.log(err);
              }
              else{
                dbc.close();
                callback(item);
                console.log("MongoDB disconnected!");
              }
            });
          }
        });
      }
    });
  };

  var removeAllData = function (collName, query, data, callback){
    dbc.open(function (err){
      if(err){
        console.log(err);
        dbc.close();
        console.log("MongoDB disconnected with err!");
      }
      else{
        console.log("MongoDB connected!");
        dbc.collection(collName, function(err, coll){
          if(err){
            dbc.close();
            console.log("MongoDB disconnected with err!");
            console.log(err);
          }
          else{
            coll.update(query, {$set: {"trash": true}}, {multi: true}, function(err, item){
              if(err){
                dbc.close();
                callback(null);
                console.log("MongoDB disconnected with err!");
                console.log(err);
              }
              else{
                dbc.close();
                callback(item);
                console.log("MongoDB disconnected!");
              }
            });
          }
        });
      }
    });
  };

  var updateData = function (collName, query, data, callback){
    dbc.open(function (err){
      if(err){
        console.log(err);
        dbc.close();
        console.log("MongoDB disconnected with err!");
      }
      else{
        console.log("MongoDB connected!");
        dbc.collection(collName, function(err, coll){
          if(err){
            dbc.close();
            console.log("MongoDB disconnected with err!");
            console.log(err);
          }
          else{
            coll.update(query, {$set: data}, function(err, item){
              if(err){
                dbc.close();
                callback(null);
                console.log("MongoDB disconnected with err!");
                console.log(err);
              }
              else{
                dbc.close();
                callback(item);
                console.log("MongoDB disconnected!");
              }
            });
          }
        });
      }
    });
  };

  var findData = function (collName, query, callback){
    dbc.open(function (err){
      if(err){
        console.log(err);
        dbc.close();
        console.log("MongoDB disconnected with err!");
      }
      else{
        console.log("MongoDB connected!");
        dbc.collection(collName, function(err, coll){
          if(err){
            dbc.close();
            console.log("MongoDB disconnected with err!");
            console.log(err);
          }
          else{
            query.trash = false;
            coll.findOne(query, function(err, item){
              if(err){
                dbc.close();
                callback(null);
                console.log("MongoDB disconnected with err!");
                console.log(err);
              }
              else{
                dbc.close();
                callback(item);
                console.log("MongoDB disconnected!");
              }
            });
          }
        });
      }
    });
  };

  var findAllData = function (collName, query, callback){
    dbc.open(function (err){
      if(err){
        console.log(err);
        dbc.close();
        console.log("MongoDB disconnected with err!");
      }
      else{
        console.log("MongoDB connected!");
        dbc.collection(collName, function(err, coll){
          if(err){
            dbc.close();
            console.log("MongoDB disconnected with err!");
            console.log(err);
          }
          else{
            query.trash = false;
            coll.find(query).toArray(function(err, item){
              if(err){
                dbc.close();
                callback(null);
                console.log("MongoDB disconnected with err!");
                console.log(err);
              }
              else{
                dbc.close();
                callback(item);
                console.log("MongoDB disconnected!");
              }
            });
          }
        });
      }
    });
  };

  //external methods definitions

  var FindUser = function (id, callback){
    findData("appUsers", {"id": id}, callback);
  };

  var CreateUser = function (profile, callback){
    insertData("appUsers",new User(profile) ,callback);
  };

  var FindOrCreateUser = function (profile, callback){
    findData("appUsers", {"id": id}, function (user) {
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
    updateData("appUsers", {"id": newProfile.id}, {"profile": newProfile.profile}, callback);
  };

  var RemoveUser = function(id, callback){
    removeData("appUsers", {"id": id}, {"trash": true}, callback);
  };

  var AddList = function(newList, callback){
    insertData("appLists", new List(genId(), newList.fbid, newList.name, newList.descr), callback);
  };

  var UpdateList = function(newList, callback){
    updateData("appLists", {"id": newList.id}, {"name": newList.name, "descr": newList.descr}, callback)
  };

  var RemoveList = function(id, callback){
    removeData("appLists", {"id": id}, {"trash": true}, callback);
  };

  var RemoveAllLists = function(fbid, callback){
    removeAllData("appLists", {"fbid": fbid}, {"trash": true}, callback);
  };

  var FindList = function (id, callback){
    findData("appLists", {"id": id}, callback);
  };

  var FindAllLists = function (fbid, callback){
    findAllData("appLists", {"fbid": fbid}, callback);
  };

  var AddTask = function(newTask, callback){
    insertData("appTasks", new Task(genId(), newTask.fbid, newTask.listid, newTask.name, newTask.descr, newTask.deadline), callback);
  };

  var FindTask = function(id, callback){
    findData("appTasks", {"id": id}, callback);
  };

  var FindAllTasks = function(listid, callback){
    findAllData("appTasks", {"listid": listid}, callback)
  };

  var UpdateTask = function(newTask, callback){
    updateData("appTasks", {"id": newTask.id}, {"name": newTask.name, "descr": newTask.descr, "deadline": newTask.deadline, "status": newTask.status}, callback);
  };

  var RemoveTask = function(id, callback){
    removeData("appTasks", {"id": id}, {"trash": true}, callback);
  };

  var RemoveAllListTasks = function(listid, callback){
    removeAllData("appTasks", {"listid": listid}, {"trash": true}, callback);
  };

  var RemoveAllUserTasks = function(fbid, callback){
    removeAllData("appTasks", {"fbid": fbid}, {"trash": true}, callback);
  };

//};