var assert = require("assert"); //module used by tests

var appData = require('../lib/data.js')('test');
var appUser = require('../lib/user.js')(appData);

// console.log(appData);
// console.log(appUser);


var profile = function(id, displayName, familyName, givenName, middleName){
    this.id = id;
    this.displayName = displayName;
    this.name = {};
    this.name.familyName = familyName;
    this.name.givenName = givenName;
    this.name.middleName = middleName;
    return this;
};

var demoProfile = profile(1, 'Testowy Profil', "Profil", "Test", "Testowy");

describe('AddLoggedinUser', function(){
    it('should add user without error', function(done){

    	appUser.login(1, demoProfile, function (user) {
    		if(user === undefined){
    			throw err;
    		}
    		else{
    			console.log(user);
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