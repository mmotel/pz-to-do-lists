exports.logout = function(req, res, appUser){
	appUser.logout(req.sessionID);
	req.logout();
	res.redirect('/');
};

exports.deleteAccount = function(req, res, appUser){
	appUser.removeAccount(req.sessionID, function () {
		req.logout();
		res.redirect('/');
	});
};

exports.getLogin = function(req, res, appUser){
	var sid = req.sessionID;
	
	console.log("sid: " + sid);

	appUser.getLogin(sid, function (user){
		res.writeHead(200, {
			'Content-Type': 'application/json; charset=utf8'
		});
		res.end(JSON.stringify(user));
	});
};

exports.getList = function (req, res, appUser, Data){
	var sid = req.sessionID;
	var fbid = appUser.checkLogin(sid);

	if(fbid !== null){ //true
		var listId = parseInt(req.params[0]);
		Data.findList(listId, function (list){
			console.log(fbid + " : " + list.fbid + " ? " + fbid === list.fbid);
			if(fbid === list.fbid){ //true
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
	var fbid = appUser.checkLogin(sid);

	if(fbid !== null){ //true
		Data.findAllLists(fbid, function (lists){
			console.log("lists:");
			console.log(lists);
			res.writeHead(200, {
				'Content-Type': 'application/json; charset=utf8'
			});
			res.end(JSON.stringify(lists));
		});
	}
	else{
		res.writeHead(404, {
			'Content-Type': 'application/json; charset=utf8'
		});
		res.end(JSON.stringify(undefined));
	}
};
