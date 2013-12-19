var assert = require("assert"); //module used by tests

var Data = require('../lib/newData.js')("test");
var Manager = require('../lib/dataManager.js')(Data);

var Group = function(owner, name, descr){
	this.owner = owner;
	this.name = name;
	this.descr = descr;
	return this;
};

describe('Manager.addGroup', function (){
	it('should create new group', function (done){
		var newGroup = new Group(1, 'Moja grupa', 'Opis mojej grupy');
		Manager.createGroup(newGroup, function (err, item){
			if (err){ done(err); }
			else{
				assert.notStrictEqual(undefined, item._id);
				assert.notStrictEqual(undefined, item.id);
				assert.strictEqual(newGroup.owner, item.owner);
				assert.strictEqual(newGroup.name, item.name);
				assert.strictEqual(newGroup.descr, item.descr);
				console.log(item);
				done();
			}
		});
	});
});