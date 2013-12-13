var assert = require("assert"); //module used by tests

var Data = require('../lib/newData.js')("test");
var Manager = require('../lib/dataManager.js')(Data);

var List = function(fbid, name, descr, trash){
    this.fbid = fbid;
    this.name = name;
    this.descr = descr;
    this.trash = false;
    return this;
};

describe('Manager.addList', function(){
	it('should add new list', function (done){
		var newList = new List(1, 'Moja Lista', 'Moj opis');
		Manager.addList(newList, function (err, item){
			if (err){ done(err); }
			else{
				assert.notStrictEqual(undefined, item._id);
				assert.notStrictEqual(undefined, item.id);
				assert.strictEqual(newList.fbid, item.fbid);
				assert.strictEqual(newList.name, item.name);
				assert.strictEqual(newList.descr, item.descr);
				done();
			}
		});
	});
});

describe('Manager.findList', function(){
	it('should find list if exist', function (done){
		var newList = new List(1, 'Moja Lista', 'Moj opis');
		Manager.addList(newList, function (err, item){
			if (err){ done(err); }
			else{
				assert.notStrictEqual(undefined, item._id);
				assert.notStrictEqual(undefined, item.id);
				assert.strictEqual(newList.fbid, item.fbid);
				assert.strictEqual(newList.name, item.name);
				assert.strictEqual(newList.descr, item.descr);
				assert.strictEqual(newList.trash, item.trash);

				Manager.findList(item.id, function (err, item2){
					if(err){ done(err); }
					else{
						assert.strictEqual(item._id.toString(), item2._id.toString());
						assert.strictEqual(item.id, item2.id);
						assert.strictEqual(item.fbid, item2.fbid);
						assert.strictEqual(item.name, item2.name);
						assert.strictEqual(item.descr, item2.descr);
						assert.strictEqual(item.trash, item2.trash);
						done();
					}
				});
			}
		});
	});

	it('should not find list if does not exist', function (done){
		Manager.findList(0, function (err, item){
			if (err){ done(); }
			else{
				assert.strictEqual(null, item);
				done();
			}
		});
	});
});

describe('Manager.findAllLists', function (){
	it('should find user all lists', function (done){
		var newList = new List(2, 'Moja Lista', 'Moj opis');
		Manager.addList(newList, function (err, item){
			if (err){ done(); }
			else{
				assert.notStrictEqual(undefined, item._id);
				assert.notStrictEqual(undefined, item.id);
				assert.strictEqual(newList.fbid, item.fbid);
				assert.strictEqual(newList.name, item.name);
				assert.strictEqual(newList.descr, item.descr);
				assert.strictEqual(newList.trash, item.trash);

				var newList2 = new List(2, 'Moja Lista2', 'Moj opis2');
				Manager.addList(newList2, function (err, item2){
					if (err) { done(); }
					else{
						assert.notStrictEqual(undefined, item2._id);
						assert.notStrictEqual(undefined, item2.id);
						assert.strictEqual(newList2.fbid, item2.fbid);
						assert.strictEqual(newList2.name, item2.name);
						assert.strictEqual(newList2.descr, item2.descr);
						assert.strictEqual(newList2.trash, item2.trash);
						
						Manager.findAllLists(2, function (err, items){
							if (err){ done(); }
							else{
								assert.strictEqual(2, items.length);
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
								assert.strictEqual(items[0].fbid, item.fbid);
								assert.strictEqual(items[0].name, item.name);
								assert.strictEqual(items[0].descr, item.descr);
								assert.strictEqual(items[0].trash, item.trash);

								assert.strictEqual(items[1]._id.toString(), item2._id.toString());
								assert.strictEqual(items[1].id, item2.id);
								assert.strictEqual(items[1].fbid, item2.fbid);
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
	it('should not find lists if does not exist', function (done){
		Manager.findAllLists(0, function (err, item){
			if (err){ done(err); }
			else{
				assert.strictEqual(0, item.length);
				done();
			}
		});
	});
});

describe('Manager.removeList', function(){
	it('should remove list if exist', function (done){
		var newList = new List(1, 'Moja Lista', 'Moj opis');
		Manager.addList(newList, function (err, item){
			if (err){ done(err); }
			else{
				assert.notStrictEqual(undefined, item._id);
				assert.notStrictEqual(undefined, item.id);
				assert.strictEqual(newList.fbid, item.fbid);
				assert.strictEqual(newList.name, item.name);
				assert.strictEqual(newList.descr, item.descr);
				assert.strictEqual(newList.trash, item.trash);

				Manager.removeList(item.id, function (err, result){
					if (err) { done(); }
					else{
						assert.strictEqual(1, result);
						Manager.findList(item.id, function (err, item){
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
	it('should not remove list if does not exist', function (done){
		Manager.removeList(0, function (err, result){
			if (err){ done(err); }
			else{
				assert.strictEqual(0, result);
				done();
			}
		});
	});
		
});

describe('Manager.removeAllLists', function(){
	it('should remove all user lists', function (done){
		var newList = new List(6, 'Moja Lista', 'Moj opis');
		Manager.addList(newList, function (err, item){
			if (err) { done(err); }
			else{
				assert.notStrictEqual(undefined, item._id);
				assert.notStrictEqual(undefined, item.id);
				assert.strictEqual(newList.fbid, item.fbid);
				assert.strictEqual(newList.name, item.name);
				assert.strictEqual(newList.descr, item.descr);
				assert.strictEqual(newList.trash, item.trash);

				var newList2 = new List(6, 'Moja Lista2', 'Moj opis2');
				Manager.addList(newList2, function(err, item2){
					if (err){ done(); }
					else{
						assert.notStrictEqual(undefined, item._id);
						assert.notStrictEqual(undefined, item.id);
						assert.strictEqual(newList.fbid, item.fbid);
						assert.strictEqual(newList.name, item.name);
						assert.strictEqual(newList.descr, item.descr);
						assert.strictEqual(newList.trash, item.trash);

						Manager.removeAllLists(6, function (err, result){
							if(err){ done(err); }
							else{
								assert.strictEqual(2, result);

								Manager.findAllLists(6, function (err, items){
									if (err){ done(); }
									else{
										assert.strictEqual(0, items.length);
										done();
									}
								});
							}
						});
					}
				});
			}
		});
	});
});