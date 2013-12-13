var assert = require("assert"); //module used by tests

var Data = require('../lib/newData.js')("test");
var Manager = require('../lib/dataManager.js')(Data);

var Task = function(fbid, listid, name, descr, deadline){
    this.fbid = fbid;
    this.listid = listid;
    this.name = name;
    this.descr = descr;
    this.deadline = deadline;
    this.status = false;
    this.trash = false;
    return this;
  };

  describe('Manager.addTask', function (){
  	it('should add new task on list', function (done){
  		var newTask = new Task(1, 1, 'moje zadanie', 'moj opis', new Date(2014,10,15,14,0,0,0));
  		Manager.addTask(newTask, function (err, item){
  			if (err){ done(err); }
  			else{
  				assert.notStrictEqual(undefined, item._id);
				assert.notStrictEqual(undefined, item.id);
				assert.strictEqual(newTask.fbid, item.fbid);
				assert.strictEqual(newTask.listid, item.listid);
				assert.strictEqual(newTask.name, item.name);
				assert.strictEqual(newTask.descr, item.descr);
				assert.strictEqual(newTask.deadline, item.deadline);
				done();
  			}
  		});
  	});
  });