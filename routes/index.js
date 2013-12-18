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
      if(!err && (list === null || fbid === list.fbid)){
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(list));
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
      if(!err && (task === null || fbid === task.fbid)){
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
    Data.findAllTasks(listId, function (err, tasks){
      if(!err && (!tasks[0] || tasks[0].fbid == fbid)){
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf8'
        });
        res.end(JSON.stringify(tasks));
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
