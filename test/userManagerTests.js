var assert = require("assert"); //module used by tests

var Data = require('../lib/newData.js')("test");
var Manager = require('../lib/dataManager.js')(Data);


var Profile = function(id, displayName, familyName, givenName, middleName){
    this.id = id;
    this.name = {};
    this.displayName = displayName;
    this.name.familyName = familyName;
    this.name.givenName = givenName;
    this.name.middleName = middleName;
    return this;
};

describe('Manager.createUser', function (){

  it('should create user without error', function (done){

    var demoProfile = new Profile(1, 'Testowy Profil', "Profil", "Test", "Testowy");

    Manager.createUser(demoProfile, function (err, item){
      if(err){ done(err); }
      else{
        assert.notStrictEqual(undefined, item._id); //if(undefined !== item._id)
        assert.strictEqual(demoProfile.id, item.id);
        assert.strictEqual(demoProfile.displayName, item.profile.displayName);
        assert.strictEqual(demoProfile.name.familyName, item.profile.name.familyName);
        assert.strictEqual(demoProfile.name.givenName, item.profile.name.givenName);
        assert.strictEqual(demoProfile.name.middleName, item.profile.name.middleName);
        done();
      }
    });
        
  });

});

describe('Manager.findUser', function (){

  it('should find user if it exists', function (done){

    var demoProfile = new Profile(2, 'Testowy Profil', "Profil", "Test", "Testowy");

    Manager.createUser(demoProfile, function (err, item){
      if(err){ done(err); }
      else{
        assert.notStrictEqual(undefined, item._id); //if(undefined !== item._id)
        assert.strictEqual(demoProfile.id, item.id);
        assert.strictEqual(demoProfile.displayName, item.profile.displayName);
        assert.strictEqual(demoProfile.name.familyName, item.profile.name.familyName);
        assert.strictEqual(demoProfile.name.givenName, item.profile.name.givenName);
        assert.strictEqual(demoProfile.name.middleName, item.profile.name.middleName);
        
        Manager.findUser(item.id, function (err, item2){
          if(err){ done(err); }
          else{
            assert.strictEqual(item._id.toString(), item2._id.toString());
            assert.strictEqual(item.id, item2.id);
            assert.strictEqual(item.profile.displayName, item2.profile.displayName);
            assert.strictEqual(item.profile.name.familyName, item2.profile.name.familyName);
            assert.strictEqual(item.profile.name.givenName, item2.profile.name.givenName);
            assert.strictEqual(item.profile.name.middleName, item2.profile.name.middleName);
            done();
          }
        });
      }
    });
        
  });

  it('should not find user if it does not exist', function (done){

    Manager.findUser(0, function (err, item){
      if(err){ done(err); }
      else{
        assert.strictEqual(null, item);
        done(); 
      }

    });

  });

});

describe('Manager.removeUser', function (){

  it('should remove user if exists', function (done){

    var demoProfile = new Profile(3, 'Testowy Profil', "Profil", "Test", "Testowy");

    Manager.createUser(demoProfile, function (err, item){
      if(err){ done(err); }
      else{
        assert.notStrictEqual(undefined, item._id); //if(undefined !== item._id)
        assert.strictEqual(demoProfile.id, item.id);
        assert.strictEqual(demoProfile.displayName, item.profile.displayName);
        assert.strictEqual(demoProfile.name.familyName, item.profile.name.familyName);
        assert.strictEqual(demoProfile.name.givenName, item.profile.name.givenName);
        assert.strictEqual(demoProfile.name.middleName, item.profile.name.middleName);

        Manager.removeUser(item.id, function (err, result){
          if(err){ done(err); }
          else{
            assert.strictEqual(1, result);
             Manager.findUser(3, function (err, item){
              if(err){ done(err); }
              else{
                assert.strictEqual(null, item);
                done(); 
              }
            });
          }
        });
      }
    });
  });

  it('should not remove user if it not exist', function (done){
    Manager.removeUser(0, function (err, result){
      if(err){ done(err); }
      else{
        assert.strictEqual(0, result);
        done();
      }
    });
  });
});

describe('Manager.updateUser', function (){
  it('should update user if exist', function (done){
    var demoProfile = new Profile(4, 'Testowy Profil', "Profil", "Test", "Testowy");
    var demoProfileUpdate = new Profile(4, 'Testowy ProfilPoZmianach', "ProfilPoZmianach", "TestPoZmianach", "TestowyPoZmianach");
    delete demoProfileUpdate.id;
    var updateData = {"id": 4, "profile": demoProfileUpdate};

    Manager.createUser(demoProfile, function (err, item){
      if (err){ done(err); }
      else{
        assert.notStrictEqual(undefined, item._id); //if(undefined !== item._id)
        assert.strictEqual(demoProfile.id, item.id);
        assert.strictEqual(demoProfile.displayName, item.profile.displayName);
        assert.strictEqual(demoProfile.name.familyName, item.profile.name.familyName);
        assert.strictEqual(demoProfile.name.givenName, item.profile.name.givenName);
        assert.strictEqual(demoProfile.name.middleName, item.profile.name.middleName);

        Manager.updateUser(updateData, function (err, result){
          if (err){ done(err); }
          else{
            assert.strictEqual(1, result); //if(undefined !== item._id)
             done();
            Manager.findUser(item.id, function (err, item2){
              if(err){ done(err); }
              else{
                assert.strictEqual(item._id.toString(), item2._id.toString());
                assert.strictEqual(item.id, item2.id);
                assert.strictEqual(item.profile.displayName, item2.profile.displayName);
                assert.strictEqual(item.profile.name.familyName, item2.profile.name.familyName);
                assert.strictEqual(item.profile.name.givenName, item2.profile.name.givenName);
                assert.strictEqual(item.profile.name.middleName, item2.profile.name.middleName);
                done();
              }
            });
          }
        });
      }
    });
  });
  
  it('should not update user if it does not exist', function (done){
    Manager.updateUser(0, function (err, result){
      if (err) { done(err); }
      else{
        assert.strictEqual(0, result)
        done();
      }
    });
  });
});