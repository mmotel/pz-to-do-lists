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
                callback(null);
                dbc.close();
                console.log("MongoDB disconnected with err!");
                console.log(err);
              }
              else{
                callback(item);
                dbc.close();
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
                callback(null);
                dbc.close();
                console.log("MongoDB disconnected with err!");
                console.log(err);
              }
              else{
                callback(item);
                dbc.close();
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
                callback(null);
                dbc.close();
                console.log("MongoDB disconnected with err!");
                console.log(err);
              }
              else{
                callback(item);
                dbc.close();
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
                callback(null);
                dbc.close();
                console.log("MongoDB disconnected with err!");
                console.log(err);
              }
              else{
                callback(item);
                dbc.close();
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
                callback(null);
                dbc.close();
                console.log("MongoDB disconnected with err!");
                console.log(err);
              }
              else{
                callback(item);
                dbc.close();
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
                callback(null);
                dbc.close();
                console.log("MongoDB disconnected with err!");
                console.log(err);
              }
              else{
                callback(item);
                dbc.close();
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
    //TO DO!
  };

  var FindOrCreateUser = function (profile, callback){
    //TO DO!
  };

  var UpdateUser = function(newProfile, callback){
    //TO DO!
  };

  var RemoveUser = function(id, callback){
    //TO DO!
  };

  var AddList = function(newList, callback){
    //TO DO!
  };

  var UpdateList = function(newList, callback){
    //TO DO!
  };

  var RemoveList = function(id, callback){
    //TO DO!
  };

  var RemoveAllLists = function(fbid, callback){
    //TO DO!
  };

  var FindList = function (id, callback){
    //TO DO!
  };

  var FindAllLists = function (fbid, callback){
    //TO DO!
  };

  var AddTask = function(newTask, callback){
    //TO DO!
  };

  var UpdateTask = function(newTask, callback){
    //TO DO!
  };

  var RemoveTask = function(newTask, callback){
    //TO DO!
  };

  var RemoveAllTasks = function(newTask, callback){
    //TO DO!
  };


// test stuff
var profile = function(id, displayName, familyName, givenName, middleName){
    this.id = id;
    this.displayName = displayName;
    this.familyName = familyName;
    this.givenName = givenName;
    this.middleName = middleName;
    return this;
};

var demoProfile = profile(1, 'Testowy Profil', "Profil", "Test", "Testowy");
    

//};