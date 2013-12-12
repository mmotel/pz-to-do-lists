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
