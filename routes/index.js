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

	console.log(fbid);

	// var resData = {
	// 	"sid": sid,
	// 	"fbid": fbid,
	// 	"params": req.params
	// };

	// res.writeHead(200, {
	// 	'Content-Type': 'application/json; charset=utf8'
	// });
	// res.end(JSON.stringify(resData));

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
				res.writeHead(200, {
					'Content-Type': 'application/json; charset=utf8'
				});
				res.end(JSON.stringify(null));
			}
		});
	}
	else{
		res.writeHead(200, {
			'Content-Type': 'application/json; charset=utf8'
		});
		res.end(JSON.stringify(null));
	}
};
