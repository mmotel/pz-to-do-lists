var assert = require("assert"); //module used by tests

var Data = require('../lib/newData.js')("test");
var Manager = require('../lib/dataManager.js')(Data);


var Profile = function(id, displayName, familyName, givenName, middleName){
    this.id = id;
    this.name = {};
    this.displayName = displayName;
    this.name.familyName = familyName;
    this.name.givenName = givenName;
    this.name.middleName = middleName;
    return this;
};

var User = function(profile){
  this.id = profile.id;
  this.profile = {};
  this.profile.displayName = profile.displayName;
  this.profile.name = {};
  this.profile.name.familyName = profile.name.familyName;
  this.profile.name.givenName = profile.name.givenName;
  this.profile.name.middleName = profile.name.middleName;
  this.trash = false;
  return this;
};

var List = function(fbid, groupid, name, descr,perms){
  this.fbid = fbid;
  this.groupid = groupid;
  this.name = name;
  this.descr = descr;
  this.perms = perms || null;
  return this;
};

var Task = function(fbid, listid, groupid, name, descr, deadline, executor){
  this.fbid = fbid;
  this.listid = listid;
  this.groupid = groupid;
  this.name = name;
  this.descr = descr;
  this.deadline = deadline;
  this.executor = executor;
  return this;
};

var Group = function(owner, name, descr, perms){
  this.owner = owner;
  this.name = name;
  this.descr = descr;
  this.members = [ {"fbid": owner }];
  this.perms = perms || null;
  this.trash = false;
  return this;
};


describe('Manager.getIncomingTasks', function (){
  it('should show tasks incoming in 7 days', function (done){

      var demoProfile = new Profile(10, 'Testowy Profil', "Profil", "Test", "Testowy");
      //add user
      Manager.createUser(demoProfile, function (err, user){
        if(err){ done(err); }
        else{
          assert.notStrictEqual(undefined, user._id); //if(undefined !== item._id)
          assert.strictEqual(demoProfile.id, user.id);
          //add user's group
          var newGroup = new Group(10, 'Moja grupa', 'Opis mojej grupy', {});
          Manager.createGroup(newGroup, function (err, group){
            if (err){ done(err); }
            else{
              assert.notStrictEqual(undefined, group._id);
              assert.notStrictEqual(undefined, group.id);
              //add group's list
              var newList = new List(10, group.id, "lista grupowa", "grupowa", {});
              Manager.addList(newList, function (err, groupList){
                if(err){ done(err); }
                else{
                  assert.notStrictEqual(undefined, groupList._id);
                  assert.notStrictEqual(undefined, groupList.id);
                  //add private list
                  var newList2 = new List(10, null, "lista prywatna", "prywatna", {});
                    Manager.addList(newList2, function (err, privList){
                      if(err){ done(err); }
                      else{
                        assert.notStrictEqual(undefined, privList._id);
                        assert.notStrictEqual(undefined, privList.id);
                        var d = new Date();
                        deadline1 = {
                          year: d.getFullYear(),
                          month: d.getMonth() + 1, //months are numearated from 0 to 11 in date objects
                          day: d.getUTCDate()
                        };
                        //add group list task
                        var newTask1 = new Task(10, groupList.id, group.id, "zadanie grupowe 1", "...", 
                          deadline1, 1);
                        Manager.addTask(newTask1, function (err, task1){
                          if(err){ done(err); }
                          else{
                            assert.notStrictEqual(undefined, task1._id);
                            assert.notStrictEqual(undefined , task1.id);
                            
                            //add private list task
                            var newTask2 = new Task(10, privList.id, null, "zadanie prywatne 1", "...", 
                              deadline1, 1);
                            Manager.addTask(newTask2, function (err, task2){
                              if(err){ done(err); }
                              else{
                                assert.notStrictEqual(undefined, task2._id);
                                assert.notStrictEqual(undefined, task2.id);

                                deadline2 = {
                                  year: d.getFullYear(),
                                  month: d.getMonth() + 1, //months are numearated from 0 to 11 in date objects
                                  day: d.getUTCDate() + 8
                                };
                                //add group list task
                                var newTask3 = new Task(10, groupList.id, group.id, "zadanie grupowe 1", "...", 
                                  deadline2, 1);
                                Manager.addTask(newTask3, function (err, task3){
                                  if(err){ done(err); }
                                  else{
                                    assert.notStrictEqual(undefined, task3._id);
                                    assert.notStrictEqual(undefined , task3.id);
                                    
                                    //add private list task
                                    var newTask4 = new Task(10, privList.id, null, "zadanie prywatne 1", "...", 
                                      deadline2, 1);
                                    Manager.addTask(newTask4, function (err, task4){
                                      if(err){ done(err); }
                                      else{
                                        assert.notStrictEqual(undefined, task4._id);
                                        assert.notStrictEqual(undefined, task4.id);

                                        Manager.getIncomingTasks(10, function (err, incomingTasks){
                                          if(err){ done(err); }
                                          else{
                                            assert.strictEqual(incomingTasks.length, 2);
                                            done();
                                          }
                                        });
                                      }
                                    });
                                  }
                                });
                              }
                            });
                          }
                        });
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