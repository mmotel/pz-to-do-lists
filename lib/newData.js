module.exports = function(dbName){

  var mongo = require('mongodb');

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

  //helper functions
  var genId = function(){
    var t = new Date();
    var id = t.getTime();
    return id;
  };

  //database connection
  var dbc = new mongo.Db(dbName || 'test', new mongo.Server('localhost', 27017), {safe: true});

  //internal functions
  var InsertData = function (collName, data, callback){
    dbc.open(function (err){
      if(err){
        dbc.close();
        callback(err, undefined);
        console.log(err);
        console.log("MongoDB disconnected with err!");
      }
      else{
        console.log("MongoDB connected!");
        dbc.collection(collName, function(err, coll){
          if(err){
            dbc.close();
            callback(err, undefined);
            console.log("MongoDB disconnected with err!");
            console.log(err);
          }
          else{
            coll.insert(data, function(err, item){
              if(err){
                dbc.close();
                callback(err, undefined);
                console.log("MongoDB disconnected with err!");
                console.log(err);
              }
              else{
                dbc.close();
                callback(undefined, item[0]);
                console.log("MongoDB disconnected!");
              }
            });
          }
        });
      }
    });
  };

  var RemoveData = function (collName, query, callback){
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

  var RemoveAllData = function (collName, query, callback){
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

  var UpdateData = function (collName, query, data, callback){
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

  var FindData = function (collName, query, callback){
    dbc.open(function (err){
      if(err){
        dbc.close();
        callback(err, undefined);
        console.log(err);
        console.log("MongoDB disconnected with err!");
      }
      else{
        console.log("MongoDB connected!");
        dbc.collection(collName, function(err, coll){
          if(err){
            dbc.close();
            callback(err, undefined);
            console.log("MongoDB disconnected with err!");
            console.log(err);
          }
          else{
            query.trash = false;
            coll.findOne(query, function(err, item){
              if(err){
                dbc.close();
                callback(err, undefined);
                console.log("MongoDB disconnected with err!");
                console.log(err);
              }
              else{
                dbc.close();
                callback(undefined, item);
                console.log("MongoDB disconnected!");
              }
            });
          }
        });
      }
    });
  };

  var FindAllData = function (collName, query, callback){
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

  return{
    insertData: InsertData,
    removeData: RemoveData,
    removeAllData: RemoveAllData,
    updateData: UpdateData,
    findData: FindData,
    findAllData: FindAllData
  }

};