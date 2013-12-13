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
