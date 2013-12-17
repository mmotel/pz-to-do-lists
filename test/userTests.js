var assert = require("assert"); //module used by tests

var Data = require('../lib/newData.js')('toDoLists');
var Manager = require('../lib/dataManager.js')(Data);
var appUser = require('../lib/user.js')(Manager);

var profile = function(id, displayName, familyName, givenName, middleName){
    this.id = id;
    this.displayName = displayName;
    this.name = {};
    this.name.familyName = familyName;
    this.name.givenName = givenName;
    this.name.middleName = middleName;
    return this;
};

describe('User.login', function (){
  it('should login user without error', function (done){

    var demoProfile = profile(1, 'Testowy Profil', "Profil", "Test", "Testowy");

    appUser.login(1, demoProfile, function (err, user) {
      if(err){ done(err) ;}
      else{
        // console.log(user);
        assert.notStrictEqual(undefined, user._id);
        assert.strictEqual(demoProfile.id, user.id);
        assert.strictEqual(demoProfile.displayName, user.profile.displayName);
        assert.strictEqual(demoProfile.name.familyName, user.profile.name.familyName);
        assert.strictEqual(demoProfile.name.givenName, user.profile.name.givenName);
        assert.strictEqual(demoProfile.name.middleName, user.profile.name.middleName);
        done();
      }
    });

  });
});

describe('User.logout', function (){
  it('should return userId when user is loggedin', function (done){

    var demoProfile = profile(2, 'Testowy Profil', "Profil", "Test", "Testowy");

    appUser.login(2, demoProfile, function (err, user){
      if(err){ done(err); }
      else{
        // console.log(user);
        assert.notStrictEqual(undefined, user._id);
        assert.strictEqual(demoProfile.id, user.id);
        assert.strictEqual(demoProfile.displayName, user.profile.displayName);
        assert.strictEqual(demoProfile.name.familyName, user.profile.name.familyName);
        assert.strictEqual(demoProfile.name.givenName, user.profile.name.givenName);
        assert.strictEqual(demoProfile.name.middleName, user.profile.name.middleName);
      
        assert.strictEqual(demoProfile.id, appUser.logout(2));
        done();
      }
    });

  });
  it('should return null when user is notloggedin', function (){

    assert.strictEqual(null, appUser.logout(3));

  });
});
