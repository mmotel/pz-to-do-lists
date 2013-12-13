var assert = require("assert"); //module used by tests

var Data = require('../lib/newData.js')("test");
var Manager = require('../lib/dataManager.js')(Data);

var List = function(id, fbid, name, descr, trash){
    this.id = id;
    this.fbid = fbid;
    this.name = name;
    this.descr = descr;
    this.trash = false;
    return this;
};

var genId = function(){
    var t = new Date();
    var id = t.getTime();
    return id;
  };

describe('Manager.addList', function(){
	it('should add new list', function (done){
		newList = new List(genId(), 1, 'Moja Lista', 'Moj opis');
		Manager.addList(newList, function (err, item){
			if (err){ done(err); }
			else{
				assert.notStrictEqual(undefined, item._id);
				assert.strictEqual(newList.id, item.id);
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
		newList = new List(genId(), 1, 'Moja Lista', 'Moj opis');
		Manager.addList(newList, function (err, item){
			if (err){ done(err); }
			else{
				assert.notStrictEqual(undefined, item._id);
				assert.strictEqual(newList.id, item.id);
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
		})
	});
});