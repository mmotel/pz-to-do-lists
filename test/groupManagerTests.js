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
				assert.strictEqual(newGroup.owner, item.members[0].fbid);
				done();
			}
		});
	});
});

describe('Manager.findGroup', function (){
	it('should find group', function (done){
		var newGroup = new Group(1, 'Moja grupa', 'Opis mojej grupy');
		Manager.createGroup(newGroup, function (err, item){
			if (err){ done(err); }
			else{
				assert.notStrictEqual(undefined, item._id);
				assert.notStrictEqual(undefined, item.id);
				assert.strictEqual(newGroup.owner, item.owner);
				assert.strictEqual(newGroup.name, item.name);
				assert.strictEqual(newGroup.descr, item.descr);
				assert.strictEqual(newGroup.owner, item.members[0].fbid);
				
				Manager.findGroup(item.id, function (err, item2){
					if (err){ done(err); }
					else{
						assert.strictEqual(item._id.toString(), item2._id.toString());
						assert.strictEqual(item.id, item2.id);
						assert.strictEqual(item.fbid, item2.fbid);
						assert.strictEqual(item.name, item2.name);
						assert.strictEqual(item.descr, item2.descr);
						assert.strictEqual(item.members[0].fbid, item2.members[0].fbid);
						assert.strictEqual(item.trash, item2.trash);
						done();
					}
				});
			}
		});
	});
});

describe('Manager.removeGroup', function (){
	it('should remove group', function (done){
		var newGroup = new Group(1, 'Moja grupa', 'Opis mojej grupy');
		Manager.createGroup(newGroup, function (err, item){
			if (err){ done(err); }
			else{
				assert.notStrictEqual(undefined, item._id);
				assert.notStrictEqual(undefined, item.id);
				assert.strictEqual(newGroup.owner, item.owner);
				assert.strictEqual(newGroup.name, item.name);
				assert.strictEqual(newGroup.descr, item.descr);
				assert.strictEqual(newGroup.owner, item.members[0].fbid);
				
				Manager.removeGroup(item.id, function (err, result){
					if (err){ done(err); }
					else{
						assert.strictEqual(1, result);

						Manager.findGroup(item.id, function (err, item){
							if (err){ done(err); }
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
});

describe('Manager.findAllGroups', function (){
	it('should find group', function (done){
		var newGroup = new Group(2, 'Moja grupa', 'Opis mojej grupy');
		var newGroup2 = new Group(2, 'Moja grupa 2', 'Opis mojej grupy 2');
		Manager.createGroup(newGroup, function (err, item){
			if (err){ done(err); }
			else{
				assert.notStrictEqual(undefined, item._id);
				assert.notStrictEqual(undefined, item.id);
				assert.strictEqual(newGroup.owner, item.owner);
				assert.strictEqual(newGroup.name, item.name);
				assert.strictEqual(newGroup.descr, item.descr);
				assert.strictEqual(newGroup.owner, item.members[0].fbid);

				Manager.createGroup(newGroup2, function (err, item2){
					if (err){ done(err); }
					else{
						assert.notStrictEqual(undefined, item2._id);
						assert.notStrictEqual(undefined, item2.id);
						assert.strictEqual(newGroup2.owner, item2.owner);
						assert.strictEqual(newGroup2.name, item2.name);
						assert.strictEqual(newGroup2.descr, item2.descr);
						assert.strictEqual(newGroup2.owner, item2.members[0].fbid);
					
						Manager.findAllGroups(2, function (err, items){
							if(err){ done(err); }
							else{
								items.sort(function (a, b){
									if (a.id < b.id){
										return -1;
									}
									else if(a.id === b.id){
										return 0; 
									}
									else {
										return 1;
									}
								});
								
								assert.strictEqual(items[0]._id.toString(), item._id.toString());
								assert.strictEqual(items[0].id, item.id);
								assert.strictEqual(items[0].owner, item.owner);
								assert.strictEqual(items[0].name, item.name);
								assert.strictEqual(items[0].descr, item.descr);
								assert.strictEqual(items[0].trash, item.trash);

								assert.strictEqual(items[1]._id.toString(), item2._id.toString());
								assert.strictEqual(items[1].id, item2.id);
								assert.strictEqual(items[1].owner, item2.owner);
								assert.strictEqual(items[1].name, item2.name);
								assert.strictEqual(items[1].descr, item2.descr);
								assert.strictEqual(items[1].trash, item2.trash);
								done();

							}
						});
					}
				});
			}
		});
	});
});

describe('Manager.updateGroup', function (){
	it('should update group', function (done){
		var newGroup = new Group(1, 'Moja grupa', 'Opis mojej grupy');
		Manager.createGroup(newGroup, function (err, item){
			if (err){ done(err); }
			else{
				assert.notStrictEqual(undefined, item._id);
				assert.notStrictEqual(undefined, item.id);
				assert.strictEqual(newGroup.owner, item.owner);
				assert.strictEqual(newGroup.name, item.name);
				assert.strictEqual(newGroup.descr, item.descr);
				assert.strictEqual(newGroup.owner, item.members[0].fbid);
				
				var updatedData = {"id": item.id, "name": 'Moja Grupa Update', "descr": 'Opis mojej grupy update'};
				Manager.updateGroup(updatedData, function (err, result){
					if (err){ done(err); }
					else{
						assert.strictEqual(1, result);

						Manager.findGroup(item.id, function (err, item2){
							if (err){ done(err); }
							else{
								assert.strictEqual(item._id.toString(), item2._id.toString());
								assert.strictEqual(item.id, item2.id);
								assert.strictEqual(updatedData.name, item2.name);
								assert.strictEqual(updatedData.descr, item2.descr);
								done();
							}
						});
					}
				});
			}
		});
	});
});

