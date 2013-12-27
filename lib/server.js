//Socket.io
var socketio = require('socket.io');

exports.listen = function(server, User, Data){
  var io = socketio.listen(server);
  io.sockets.on('connection', function (client) {
    'use strict';

      //updateUser
      client.on('updateUser', function (newuser){
        Data.updateUser(newuser, function (err,result) {
          if(err){}
          else{
            if(result === 1){
              Data.findUser(newuser.id, function (err,data) {
                if(err){}
                else{
                  client.emit('updatedUser', data);
                }
              });
            }
          }
        });
      });

      //addList
      client.on('addList', function (newlist) {
        Data.addList(newlist, function (err, item) {
          if(err){}
          else{
            if(item && item !== null){
              console.log(item);
              Data.findAllLists(newlist.fbid, function (err, items){
                if(err){}
                else{
                  client.emit('addedList', items);
                }
              });
            }
          }
        });
      });

      //rmList
      client.on('rmList', function (data) {
        Data.removeList(data.id, function (err, item) {
          if(err){}
          else{
            console.log(item);
            Data.findAllLists(data.fbid, function (err, items){
              if(err){}
              else{
                client.emit('rmedList', items);
              }
            });
          }
        });
      });

      //editList
      client.on('editList', function (data) {
        Data.updateList(data, function (err, result) {
          if(err){}
          else{
            console.log(result);
            if(result === 1){
              Data.findAllLists(data.fbid, function (err, items){
                if(err){}
                else{
                  client.emit('editedList', items);
                }
              });
            }
          }
        });
      });

      //addTask
      client.on('addTask', function (newtask) {
        Data.addTask(newtask, function (err, item) {
          if(err){}
          else{
            if(item && item !== null){
              Data.findAllTasks(newtask.listid, function (err, items){
                if(err){}
                else{
                  Data.findList(newtask.listid, function (err, list){
                    if(err){}
                    else{
                      client.emit('addedTask', {"list": list, "tasks": items});
                    }
                  });
                }
              });
            }
          }
        });
      });

      //editTask
      client.on('editTask', function (editedTask){
        Data.updateTask(editedTask, function (err, result){
          if(err){}
          else{
            if(result === 1){
              Data.findAllTasks(editedTask.listid, function (err, items){
                if(err){}
                else{
                  Data.findList(editedTask.listid, function (err, list){
                    if(err){}
                    else{
                      client.emit('editedTask', {"list": list, "tasks": items});
                    }
                  });
                }
              });
            }
          }
        });
      });

      //rmTask
      client.on('rmTask', function (rmedTask){
        console.log(rmedTask);
        Data.removeTask(rmedTask.id, function (err, result){
          if(err){}
          else{
            console.log(result);
            if(result === 1){
              Data.findAllTasks(rmedTask.listid, function (err, items){
                if(err){}
                else{
                  Data.findList(rmedTask.listid, function (err, list){
                    if(err){}
                    else{
                      client.emit('rmedTask', {"list": list, "tasks": items});
                    }
                  });
                }
              });
            }
          }
        });
      });

      //doneTask
      client.on('doneTask', function (doneTask){
        console.log(doneTask);
        Data.makeTaskDone(doneTask.id, function (err, result){
          if(err){}
          else{
            if(result === 1){
              Data.findAllTasks(doneTask.listid, function (err, items){
                if(err){}
                else{
                  Data.findList(doneTask.listid, function (err, list){
                    if(err){}
                    else{
                      client.emit('doneTask', {"list": list, "tasks": items});
                    }
                  });
                }
              });
            }
          }
        });
      });

      //addGroup
      client.on('addGroup', function (newgroup) {
        Data.createGroup(newgroup, function (err, item) {
          if(err){}
          else{
            if(item && item !== null){
              console.log(item);
              Data.findAllGroups(newgroup.owner, function (err, items){
                if(err){}
                else{
                  client.emit('addedGroup', items);
                }
              });
            }
          }
        });
      });

      //editGroup
      client.on('editGroup', function (data) {
        Data.updateGroup(data, function (err, result) {
          if(err){}
          else{
            console.log(result);
            if(result === 1){
              Data.findAllGroups(data.fbid, function (err, items){
                if(err){}
                else{
                  client.emit('editedGroup', items);
                }
              });
            }
          }
        });
      });

      //rmGroup
      client.on('rmGroup', function (data) {
        Data.removeGroup(data.id, function (err, item) {
          if(err){}
          else{
            console.log(item);
            Data.findAllGroups(data.fbid, function (err, items){
              if(err){}
              else{
                client.emit('rmedGroup', items);
              }
            });
          }
        });
      });

      //addUserToGroup
      client.on('addUserToGroup', function (data){
        Data.addUserToGroup(data.user, data.group, function (err, result){
          if(err){}
          else{
            if(result === 1){
              Data.findGroup(data.group, function (err, item){
                if(err){}
                else{
                  Data.findGroupMembers(item.members, function (err, items){
                    if(err){}
                    else{
                      Data.findGroupLists(data.group, function (err, lists){
                        client.emit('addUserToGroup', {"group": item, "members": items, "lists": lists});
                      });
                    }
                  });
                }
              });
            }
          }
        });
      });

      //removeUserFromGroup
      client.on('removeUserFromGroup', function (data){
        Data.removeUserFromGroup(data.user, data.group, function (err, result){
          if(err){}
          else{
            if(result === 1){
              Data.findGroup(data.group, function (err, item){
                if(err){}
                else{
                  Data.findGroupMembers(item.members, function (err, items){
                    if(err){}
                    else{
                      Data.findGroupLists(data.group, function (err, lists){
                        client.emit('removeUserFromGroup', {"group": item, "members": items, "lists": lists});
                      });
                    }
                  });
                }
              });     
            }
          }
        });
      });

  });

};