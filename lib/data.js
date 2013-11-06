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
    return this;
  };

  var List = function(id, fbid, name, descr){
    this.id = id;
    this.fbid = fbid;
    this.name = name;
    this.descr = descr;
    return this;
  };

  var genId = function(){
    var t = new Date();
    var id = t.getTime();
    return id;
  }

  var dbc = new mongo.Db('test', new mongo.Server('localhost', 27017), {safe: true});


  var FindUser = function (id, callback){
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
            coll.findOne({"id": id}, function (err, item){
              if(err){
                dbc.close();
                console.log("MongoDB disconnected with error!");
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
  };

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
                console.log(item[0]);
                callback(item[0]); //user object from db
              }
            });
          }
        });
      }
    });
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
            console.log(newProfile);

            coll.update({"id": newProfile.id}, {$set: {"profile": newProfile.profile}}, function (err, result){
              if(err){
                dbc.close();
                console.log("MongoDB disconnected with err!");
                console.log(err);
                callback(undefined);
              }
              else{
                dbc.close();
                console.log("MongoDB disconnected!");
                callback(result); //status object from db
              }
            });
          }
        });
      }
    });
  };

  var RemoveUser = function(id, callback){
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
            coll.remove({"id": id}, function (err, result){
              if(err){
                dbc.close();
                console.log("MongoDB disconnected with err!");
                console.log(err);
                callback(undefined);
              }
              else{
                dbc.close();
                console.log("MongoDB disconnected!");
                callback(result); //user object from db
              }
            });
          }
        });
      }
    });
  };

  var AddList = function(newList, callback){
    dbc.open(function (err){
      if(err){
        console.log(err);
      }
      else{
        console.log("MongoDB connected!");
        dbc.collection('appLists', function (err, coll){
          if(err){
          dbc.close();
          console.log("MongoDB disconnected!");
          console.log(err);  
          }
        else{
          var listToInsert = new List(genId(), newList.fbid, newList.name, newList.descr);
          coll.insert(listToInsert, function (err, item){
            if (err){
              dbc.close();
              console.log("MongoDB disconnected with err!!!");
              console.log(err);
              callback(undefined);
            }
            else{
              dbc.close();
              console.log("MongoDB disconnected!");
              console.log(item[0]);
              callback(item[0]); //user object from db
            }
          });
          }
        });
      }
    });
  };

  var UpdateList = function(newList, callback){
    dbc.open(function (err){
      if(err) {
        console.log(err);
      }
      else{
        console.log("MongoDB connected!");
        dbc.collection('appLists', function (err, coll) {
          if(err){
            dbc.close();
            console.log("MongoDB disconnected!");
            console.log(err);
          }
          else{
            console.log(newList);

            coll.update({"id": newList.id}, {$set: {"name": newList.name, "descr": newList.descr}}, function (err, result){
              if(err){
                dbc.close();
                console.log("MongoDB disconnected with err!");
                console.log(err);
                callback(undefined);
              }
              else{
                dbc.close();
                console.log("MongoDB disconnected!");
                callback(result); //status object from db
              }
            });
          }
        });
      }
    });
  };

  var RemoveList = function(id, callback){
    dbc.open(function (err){
      if(err) {
        console.log(err);
      }
      else{
        console.log("MongoDB connected!");
        dbc.collection('appLists', function (err, coll) {
          if(err){
            dbc.close();
            console.log("MongoDB disconnected!");
            console.log(err);
          }
          else{
            coll.remove({"id": id}, function (err, result){
              if(err){
                dbc.close();
                console.log("MongoDB disconnected with err!");
                console.log(err);
                callback(undefined);
              }
              else{
                dbc.close();
                console.log("MongoDB disconnected!");
                callback(result); //user object from db
              }
            });
          }
        });
      }
    });
  };

  var RemoveAllLists = function(fbid, callback){
    dbc.open(function (err){
      if(err) {
        console.log(err);
      }
      else{
        console.log("MongoDB connected!");
        dbc.collection('appLists', function (err, coll) {
          if(err){
            dbc.close();
            console.log("MongoDB disconnected!");
            console.log(err);
          }
          else{
            coll.remove({"fbid": fbid}, function (err, result){
              if(err){
                dbc.close();
                console.log("MongoDB disconnected with err!");
                console.log(err);
                callback(undefined);
              }
              else{
                dbc.close();
                console.log("MongoDB disconnected!");
                callback(result); //user object from db
              }
            });
          }
        });
      }
    });
  };

  var FindList = function (id, callback){
    dbc.open(function (err){
      if(err) {
        console.log(err);
      }
      else{
        console.log("MongoDB connected!");
        dbc.collection('appLists', function (err, coll) {
          if(err){
            dbc.close();
            console.log("MongoDB disconnected!");
            console.log(err);
          }
          else{
            coll.findOne({"id": id}, function (err, item){
              if(err){
                dbc.close();
                console.log("MongoDB disconnected with error!");
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
  };

  var FindAllLists = function (fbid, callback){
    dbc.open(function (err){
      if(err) {
        console.log(err);
      }
      else{
        console.log("MongoDB connected!");
        dbc.collection('appLists', function (err, coll) {
          if(err){
            dbc.close();
            console.log("MongoDB disconnected!");
            console.log(err);
          }
          else{
            coll.findOne({"fbid": fbid}, function (err, item){
              if(err){
                dbc.close();
                console.log("MongoDB disconnected with error!");
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
  };


  return {
    findUser: FindUser,
    findOrCreateUser: FindOrCreateUser,
    updateUser: UpdateUser,
    removeUser: RemoveUser,
    addList: AddList,
    updateList: UpdateList,
    removeList: RemoveList,
    removeAllLists: RemoveAllLists,
    findList: FindList,
    findAllLists: FindAllLists
  };

};