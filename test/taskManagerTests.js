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

describe('Manager.findAllTasks', function (){
	it('should find all tasks on list', function (done){
		var newTask = new Task(1, 2, 'moje zadanie', 'moj opis', new Date(2014,10,15,14,0,0,0));
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

				var newTask2 = new Task(1, 2, 'moje zadanie2', 'moj opis2', new Date(2014,10,15,14,0,0,0));
				Manager.addTask(newTask2, function (err, item2){
					if (err){ done(err); }
					else{
						assert.notStrictEqual(undefined, item2._id);
						assert.notStrictEqual(undefined, item2.id);
						assert.strictEqual(newTask2.fbid, item2.fbid);
						assert.strictEqual(newTask2.listid, item2.listid);
						assert.strictEqual(newTask2.name, item2.name);
						assert.strictEqual(newTask2.descr, item2.descr);
						assert.strictEqual(newTask2.deadline, item2.deadline);

						Manager.findAllTasks(2, function (err, items){
							if (err){ done(err); }
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
	it('should not find tasks on list if does not exist', function (done){
		Manager.findAllTasks(0, function (err, item){
			if (err){ done(err); }
			else{
				assert.strictEqual(0, item.length);
				done();
			}
		});
	});
});

describe('Manager.removeTask', function (){
	it('should remove task from list', function (done){
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

				Manager.removeTask(item.id, function (err, result){
					if (err){ done(err); }
					else{
						assert.strictEqual(1, result);
						
						Manager.findTask(item.id, function (err, item){
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
	it('should not remove task from list if does not exist', function (done){
		Manager.removeTask(0, function (err, result){
			if (err){ done(err); }
			else{
				assert.strictEqual(0, result);
				done();
			}
		});
	});
});

describe('Manager.removeAllListTasks', function (){
	it('should remove all tasks from list', function (done){
		var newTask = new Task(1, 3, 'moje zadanie', 'moj opis', new Date(2014,10,15,14,0,0,0));
		var newTask2 = new Task(1, 3, 'moje zadanie', 'moj opis', new Date(2014,10,15,14,0,0,0));
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

				Manager.addTask(newTask2, function (err, item2){
					if (err){ done(err); }
					else{
						assert.notStrictEqual(undefined, item2._id);
						assert.notStrictEqual(undefined, item2.id);
						assert.strictEqual(newTask2.fbid, item2.fbid);
						assert.strictEqual(newTask2.listid, item2.listid);
						assert.strictEqual(newTask2.name, item2.name);
						assert.strictEqual(newTask2.descr, item2.descr);
						assert.strictEqual(newTask2.deadline, item2.deadline);

						Manager.removeAllListTasks(3, function (err, result){
							if (err){ done(err); }
							else{
								assert.strictEqual(2, result);
								

								Manager.findAllTasks(3, function (err, items){
									if (err){ done(err); }
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
	it('should not remove tasks from list if does not exist', function (done){
		Manager.removeAllListTasks(0, function (err, result){
			if (err){ done(err); }
			else{
				assert.strictEqual(0, result);
				done();
			}
		});
	});
});

describe('Manager.removeAllUserTasks', function (){
	it('should remove all user tasks', function (done){
		var newTask = new Task(2, 4, 'moje zadanie', 'moj opis', new Date(2014,10,15,14,0,0,0));
		var newTask2 = new Task(2, 4, 'moje zadanie', 'moj opis', new Date(2014,10,15,14,0,0,0));
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

				Manager.addTask(newTask2, function (err, item2){
					if (err){ done(err); }
					else{
						assert.notStrictEqual(undefined, item2._id);
						assert.notStrictEqual(undefined, item2.id);
						assert.strictEqual(newTask2.fbid, item2.fbid);
						assert.strictEqual(newTask2.listid, item2.listid);
						assert.strictEqual(newTask2.name, item2.name);
						assert.strictEqual(newTask2.descr, item2.descr);
						assert.strictEqual(newTask2.deadline, item2.deadline);

						Manager.removeAllUserTasks(2, function (err, result){
							if (err){ done(err); }
							else{
								assert.strictEqual(2, result);
								

								Manager.findAllTasks(4, function (err, items){
									if (err){ done(err); }
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
	it('should not remove user tasks if does not exist', function (done){
		Manager.removeAllUserTasks(0, function (err, result){
			if (err){ done(err); }
			else{
				assert.strictEqual(0, result);
				done();
			}
		});
	});
});

