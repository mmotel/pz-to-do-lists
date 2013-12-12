var assert = require("assert"); //module used by tests

var Data = require('../lib/newData.js')("test");
var Manager = require('../lib/dataManager.js')(Data);


var profile = function(id, displayName, familyName, givenName, middleName){
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

    var demoProfile = profile(1, 'Testowy Profil', "Profil", "Test", "Testowy");

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

    var demoProfile = profile(2, 'Testowy Profil', "Profil", "Test", "Testowy");

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