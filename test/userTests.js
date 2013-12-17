var assert = require("assert"); //module used by tests

var Data = require('../lib/newData.js')('test');
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

    assert.strictEqual(null, appUser.logout(0));

  });
});

describe('User.getLogin', function (){
  it('should return user object if user is loggedin', function (done){

    var demoProfile = profile(3, 'Testowy Profil', "Profil", "Test", "Testowy");

    appUser.login(3, demoProfile, function (err, user){
      if(err){ done(err); }
      else{
        // console.log(user);
        assert.notStrictEqual(undefined, user._id);
        assert.strictEqual(demoProfile.id, user.id);
        assert.strictEqual(demoProfile.displayName, user.profile.displayName);
        assert.strictEqual(demoProfile.name.familyName, user.profile.name.familyName);
        assert.strictEqual(demoProfile.name.givenName, user.profile.name.givenName);
        assert.strictEqual(demoProfile.name.middleName, user.profile.name.middleName);
      
        appUser.getLogin(3, function (err, user2){
          if(err){ done(err); }
          else{
            assert.strictEqual(user._id.toString(), user2._id.toString());
            assert.strictEqual(user.id, user2.id);
            assert.strictEqual(user.profile.displayName, user2.profile.displayName);
            assert.strictEqual(user.profile.name.familyName, user2.profile.name.familyName);
            assert.strictEqual(user.profile.name.givenName, user2.profile.name.givenName);
            assert.strictEqual(user.profile.name.middleName, user2.profile.name.middleName);
            done();
          }
        });
      }
    });

  });

  it('should return null if user is notloggedin', function (done){
    appUser.getLogin(0, function (err, user){
      assert.strictEqual(null, user);
      done();
    });

  });
});

describe('User.removeAccount', function (){
  it('should remove user account if user exists and is loggedin', function (done){

    var demoProfile = profile(4, 'Testowy Profil', "Profil", "Test", "Testowy");

    appUser.login(4, demoProfile, function (err, user) {
      if(err){ done(err) ;}
      else{
        // console.log(user);
        assert.notStrictEqual(undefined, user._id);
        assert.strictEqual(demoProfile.id, user.id);
        assert.strictEqual(demoProfile.displayName, user.profile.displayName);
        assert.strictEqual(demoProfile.name.familyName, user.profile.name.familyName);
        assert.strictEqual(demoProfile.name.givenName, user.profile.name.givenName);
        assert.strictEqual(demoProfile.name.middleName, user.profile.name.middleName);
        

        appUser.removeAccount(4, function (err, result){
          if(err){ done(err); }
          else{
            assert.strictEqual(1, result);
            Manager.findUser(user.id, function (err, user2){
              if(err){ done(err); }
              assert.strictEqual(null, user2);
              done();
            });
          }
        });
      }
    });

  });

  it('should not remove user account if user is not loggedin', function (done){

    var demoProfile = profile(5, 'Testowy Profil', "Profil", "Test", "Testowy");

    appUser.login(5, demoProfile, function (err, user){
      if(err){ done(err); }
      else{
        // console.log(user);
        assert.notStrictEqual(undefined, user._id);
        assert.strictEqual(demoProfile.id, user.id);
        assert.strictEqual(demoProfile.displayName, user.profile.displayName);
        assert.strictEqual(demoProfile.name.familyName, user.profile.name.familyName);
        assert.strictEqual(demoProfile.name.givenName, user.profile.name.givenName);
        assert.strictEqual(demoProfile.name.middleName, user.profile.name.middleName);
      
        var fbid = appUser.logout(5);

        assert.strictEqual(demoProfile.id, fbid);
        
        appUser.removeAccount(5, function (err, result){
          if(err){ done(err); }
          else{
            assert.strictEqual(null, result);
            done();
          }
        });
      }
    });

  });
});

describe('User.checkLogin', function (){
  it('should return user id if user is loggedin', function (done){

    var demoProfile = profile(6, 'Testowy Profil', "Profil", "Test", "Testowy");

    appUser.login(6, demoProfile, function (err, user) {
      if(err){ done(err) ;}
      else{
        // console.log(user);
        assert.notStrictEqual(undefined, user._id);
        assert.strictEqual(demoProfile.id, user.id);
        assert.strictEqual(demoProfile.displayName, user.profile.displayName);
        assert.strictEqual(demoProfile.name.familyName, user.profile.name.familyName);
        assert.strictEqual(demoProfile.name.givenName, user.profile.name.givenName);
        assert.strictEqual(demoProfile.name.middleName, user.profile.name.middleName);
        
        var userId = appUser.checkLogin(6);
        assert.strictEqual(user.id, userId);
        done();
      }
    });
  });

  it('should result null if user is not loggedin', function (done){
      var userId = appUser.checkLogin(0);
      assert.strictEqual(null, userId);
      done();
  });
});
