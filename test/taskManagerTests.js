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

  describe('Manager.findTask', function (){
  	it('should find task on list if exist', function (done){
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

				Manager.findTask(item.id, function (err, item2){
					if (err){ done(err); }
					else{
						assert.strictEqual(item._id.toString(), item2._id.toString());
						assert.strictEqual(item.id, item2.id);
						assert.strictEqual(item.fbid, item2.fbid);
						assert.strictEqual(item.listid, item2.listid);
						assert.strictEqual(item.name, item2.name);
						assert.strictEqual(item.descr, item2.descr);
						assert.strictEqual(item.deadline.toString(), item2.deadline.toString());
						assert.strictEqual(item.status, item2.status);
						assert.strictEqual(item.trash, item2.trash);
						done();
					}
				});
  			}
  		});
  	});

	it('should not find task if does not exist', function (done){
		Manager.findTask(0, function (err, item){
			if (err){ done(err); }
			else{
				assert.strictEqual(null, item);
				done();
			}
		});
	});
  });