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