var containsObject = function (obj, list) {
    
    for(var i =0; i < list.length; i++){
      if(list[i].fbid === obj){
        return true;
      }
    }

    return false;
}

exports.logout = function(req, res, appUser){
  appUser.logout(req.sessionID);
  req.logout();
  res.redirect('/');
};

exports.deleteAccount = function(req, res, appUser){
  appUser.removeAccount(req.sessionID, function (err, result) {
    if(err){}
    else{
      req.logout();
      res.redirect('/');
    }
  });
};

exports.getLogin = function(req, res, appUser){
  var sid = req.sessionID;
  
  console.log("sid: " + sid);

  appUser.getLogin(sid, function (err, user){
    if(err){
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf8'
      });
      res.end(JSON.stringify(null));
    }
    else{
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf8'
      });
      res.end(JSON.stringify(user));
    }
  });
};

exports.getList = function (req, res, appUser, Data){
  var sid = req.sessionID;
  var fbid = appUser.checkLogin(sid);

  if(fbid !== null){
    var listId = parseInt(req.params[0]);
    Data.findList(listId, function (err, list){
      if(!err){
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(list));
      }
      else if(!err && list.groupid !== null){
        Data.findGroup(list.groupid, function (err, group){
          if(err){
            res.writeHead(404, {
              'Content-Type': 'application/json; charset=utf8'
            });
            res.end(JSON.stringify(undefined));
          }
          else{
            Data.findGroupMembers(group.members, function (err, members){
              if(err || !( containsObject(fbid, members) ) ){
                res.writeHead(404, {
                  'Content-Type': 'application/json; charset=utf8'
                });
                res.end(JSON.stringify(undefined));
              }
              else{
                  res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf8'
                  });
                  res.end(JSON.stringify(list));
              }
            });
          }
        });
      }
      else{
        res.writeHead(404, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(undefined));
      }
    });
  }
  else{
    res.writeHead(404, {
      'Content-Type': 'application/json; charset=utf8'
    });
    res.end(JSON.stringify(undefined));
  }
};

exports.getLists = function (req, res, appUser, Data){
  var sid = req.sessionID;
  console.log(sid);
  var fbid = appUser.checkLogin(sid);
  console.log(fbid);

  if(fbid !== null){
    Data.findAllLists(fbid, function (err, lists){
      if(err){
        res.writeHead(404, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(undefined));
      }
      else{
        console.log("lists:");
        console.log(lists);
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(lists));
      }
    });
  }
  else{
    res.writeHead(404, {
      'Content-Type': 'application/json; charset=utf8'
    });
    res.end(JSON.stringify(undefined));
  }
};

exports.getTask = function (req, res, appUser, Data){
  var sid = req.sessionID;
  var fbid = appUser.checkLogin(sid);

  if(fbid !== null){
    var taskId = parseInt(req.params[0]);
    Data.findTask(taskId, function (err, task){
      if(!err){
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(task));
      }
      else{
        res.writeHead(404, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(undefined));
      }
    });
  }
  else{
    res.writeHead(404, {
      'Content-Type': 'application/json; charset=utf8'
    });
    res.end(JSON.stringify(undefined));
  }
};

exports.getTasks = function (req, res, appUser, Data){
  var sid = req.sessionID;
  var fbid = appUser.checkLogin(sid);

  if(fbid !== null){
    var listId = parseInt(req.params[0]);
    Data.findList(listId, function (err, list){
      if(!err){
        Data.findAllTasks(listId, function (err, tasks){
          if(err){
            res.writeHead(404, {
              'Content-Type': 'application/json; charset=utf8'
            });
            res.end(JSON.stringify(undefined));
          }
          else{
            res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf8'
            });
            res.end(JSON.stringify({"tasks": tasks, "list": list}));
          }
        });
      }
      else{
        res.writeHead(404, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(undefined));
      }
    });
  }
  else{
    res.writeHead(404, {
      'Content-Type': 'application/json; charset=utf8'
    });
    res.end(JSON.stringify(undefined));
  }
};

exports.getGroup = function (req, res, appUser, Data){
  var sid = req.sessionID;
  var fbid = appUser.checkLogin(sid);

  if(fbid !== null){
    var groupId = parseInt(req.params[0]);
    Data.findGroup(groupId, function (err, group){
      if(!err && (group === null || containsObject(fbid, group.members) )){
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(group));
      }
      else{
        res.writeHead(404, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(undefined));
      }
    });
  }
  else{
    res.writeHead(404, {
      'Content-Type': 'application/json; charset=utf8'
    });
    res.end(JSON.stringify(undefined));
  }
};

exports.getGroups = function (req, res, appUser, Data){
  var sid = req.sessionID;
  console.log(sid);
  var fbid = appUser.checkLogin(sid);
  console.log(fbid);

  if(fbid !== null){
    Data.findAllGroups(fbid, function (err, groups){
      if(err){
        res.writeHead(404, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(undefined));
      }
      else{
        console.log(groups);
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(groups));
      }
    });
  }
  else{
    res.writeHead(404, {
      'Content-Type': 'application/json; charset=utf8'
    });
    res.end(JSON.stringify(undefined));
  }
};

exports.getGroupAll = function (req, res, appUser, Data){
  var sid = req.sessionID;
  var fbid = appUser.checkLogin(sid);

  if(fbid !== null){
    var groupId = parseInt(req.params[0]);
    Data.findGroup(groupId, function (err, group){
      if(!err && (group !== null || containsObject(fbid, group.members) )){
        Data.findGroupMembers(group.members, function (err, items){
          if(err){
            res.writeHead(404, {
              'Content-Type': 'application/json; charset=utf8'
            });
            res.end(JSON.stringify(undefined));
          }
          else{
            Data.findGroupLists(groupId, function (err, lists){
              if(err){
                res.writeHead(404, {
                  'Content-Type': 'application/json; charset=utf8'
                });
                res.end(JSON.stringify(undefined));
              }
              else{
                res.writeHead(200, {
                  'Content-Type': 'application/json; charset=utf8'
                });
                res.end(JSON.stringify({"group": group, "members": items, "lists": lists}));
              }
            });
          }
        });
      }
      else{
        res.writeHead(404, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(undefined));
      }
    });
  }
  else{
    res.writeHead(404, {
      'Content-Type': 'application/json; charset=utf8'
    });
    res.end(JSON.stringify(undefined));
  }
};

exports.getGroupMembers = function (req, res, appUser, Data){
  var sid = req.sessionID;
  var fbid = appUser.checkLogin(sid);

  if(fbid !== null){
    var groupId = parseInt(req.params[0]);
    Data.findGroup(groupId, function (err, group){
      if(!err && (group !== null || containsObject(fbid, group.members) )){
        Data.findGroupMembers(group.members, function (err, items){
          if(err){
            res.writeHead(404, {
              'Content-Type': 'application/json; charset=utf8'
            });
            res.end(JSON.stringify(undefined));
          }
          else{
            res.end(JSON.stringify({"group": group, "members": items}));
          }
        });
      }
      else{
        res.writeHead(404, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(undefined));
      }
    });
  }
  else{
    res.writeHead(404, {
      'Content-Type': 'application/json; charset=utf8'
    });
    res.end(JSON.stringify(undefined));
  }
};

exports.searchUsers = function (req, res, appUser, Data){
  var sid = req.sessionID;
  console.log(sid);
  var fbid = appUser.checkLogin(sid);
  console.log(fbid);

  if(fbid !== null){
    var query = req.params[0];
    Data.searchUsers(query, function (err, users){
      if(err){
        res.writeHead(404, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(undefined));
      }
      else{
        console.log(users);
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(users));
      }
    });
  }
  else{
    res.writeHead(404, {
      'Content-Type': 'application/json; charset=utf8'
    });
    res.end(JSON.stringify(undefined));
  }
};

exports.getIncomingTasks = function (req, res, appUser, Data){
  var sid = req.sessionID;
  console.log(sid);
  var fbid = appUser.checkLogin(sid);
  console.log(fbid);

  if(fbid !== null){
    Data.getIncomingTasks(fbid, function (err, tasks){
      if(err){
        res.writeHead(404, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(undefined));
      }
      else{
        console.log("tasks:");
        console.log(tasks);
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(tasks));
      }
    });
  }
  else{
    res.writeHead(404, {
      'Content-Type': 'application/json; charset=utf8'
    });
    res.end(JSON.stringify(undefined));
  }
};
