module.exports = function(){

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
  }

};