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
  }

  var dbc = new mongo.Db('test', new mongo.Server('localhost', 27017), {safe: true});

 // dbc.open(function (err){
 //   if(err){
 //     console.log(err);
 //   }
 //   else{
 //     console.log("MongoDB connected!");

 //     dbc.collection('appUsers', function (err, coll) {
 //       if(err){
 //         dbc.close();
 //         console.log("MongoDB disconnected with error!");
 //         console.log(err);
 //       }
 //       else{
 //         coll.drop(function (err, reply){ //reply - true/false from db
 //           if(err){
 //             dbc.close();
 //             console.log("MongoDB disconnected with error!");
 //             console.log(err);
 //           }
 //           else{
 //             dbc.close();
 //             console.log("MongoDB disconnected!");
 //             console.log("db.appUsers.drop() " + reply);
 //             //! ! ! ANY TEST OR DATA IMPORTS HERE ! ! !

 //              var profile = {
 //                 id: 1234,
 //                 displayName: "Jan Kowal Kowalski",
 //                 name: {
 //                     familyName: "Kowalski",
 //                     givenName: "Jan",
 //                     middleName: "Kowal"
 //                 }
 //              }
 //                CreateUser(profile, function(user){
 //                profile.displayName = "dupa dupa";
 //                var id = profile.id;
 //                console.log(profile);
 //                RemoveUser(profile, function(reply){
 //                  console.log(reply);
 //                  FindUser(id, function (user){
 //                    console.log(user);
 //                  });
 //                });
 //               });
 //           }
 //         });
 //       }
 //     });
 //   }
 // });

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
            var id = newProfile.id;
            delete newProfile.id;
            console.log(newProfile);
            console.log(id);
            coll.update({"id": id}, {$set: {"profile": newProfile}}, function (err, result){
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
  }

  var RemoveUser = function(Profile, callback){
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
            console.log(Profile);
            var id = Profile.id;
            delete Profile.id;
            console.log(Profile);
            console.log(id);
            coll.remove({"id": id}, {"profile": Profile}, function (err, result){
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
  }

  return {
    findUser: FindUser,
    findOrCreateUser: FindOrCreateUser,
    updateUser: UpdateUser,
    removeUser: RemoveUser
  };

};