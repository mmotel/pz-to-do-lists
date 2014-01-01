/*jshint node: true */
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var routes = require('./routes');
//passport
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

//app configuration
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.cookieParser());
	app.use(express.session({secret: 'secret', key: 'express.sid'}));
});

//setup server
var server = http.createServer(app).listen(app.get('port'), function () {
    console.log("Serwer nasłuchuje na porcie " + app.get('port'));
});

var appData = require('./lib/data.js')('toDoLists');
var Data = require('./lib/newData.js')('toDoLists');
var Manager = require('./lib/dataManager.js')(Data);
var appUser = require('./lib/user.js')(Manager);
var appServer = require('./lib/server.js');

appServer.listen(server, appUser, Manager);

//passport-facebook configuration
var FACEBOOK_APP_ID = '637141929672070';
var FACEBOOK_APP_SECRET = 'e68a60dd7659d17793c0c42d96bd5aeb';

passport.use(new FacebookStrategy({
	clientID: FACEBOOK_APP_ID,
	clientSecret: FACEBOOK_APP_SECRET,
	callbackURL: "http://localhost:3000/auth/facebook/callback",
	passReqToCallback: true
	},
	function(req, accessToken, refreshToken, profile, done) {
		//TO DO: add user into loggein users list / find or create user in db
		appUser.login(req.sessionID, profile, function (err, user){
			if(err){ done(err); }
			else{
				console.log("sid: " + req.sessionID);
				console.log("id: " + user.id + " name: " + user.profile.displayName);
				done(null, { id: user.id, name: user.profile.displayName });
			}
		});
	}
));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
	passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/' }));

app.get('/logout', function(req, res){ routes.logout(req, res, appUser); });

app.get('/deleteAccount', function (req, res) { routes.deleteAccount(req, res, appUser); });

app.get('/getLogin', function (req, res) { routes.getLogin(req, res, appUser); });
// REST API
app.get(/data\/get\/list\/(\d+)/, function (req, res) { routes.getList(req, res, appUser, Manager); });

app.get('/data/get/lists/', function (req, res) { routes.getLists(req, res, appUser, Manager); });

app.get(/data\/get\/task\/(\d+)/, function (req, res) { routes.getTask(req, res, appUser, Manager); });

app.get(/data\/get\/tasks\/(\d+)/, function (req, res) { routes.getTasks(req, res, appUser, Manager); });

app.get(/data\/get\/group\/all\/(\d+)/, function (req, res) { routes.getGroupAll(req, res, appUser, Manager); });

app.get(/data\/get\/group\/members\/(\d+)/, function (req, res) { routes.getGroupMembers(req, res, appUser, Manager); });

app.get(/data\/get\/group\/(\d+)/, function (req, res) { routes.getGroup(req, res, appUser, Manager); });

app.get('/data/get/groups/', function (req, res) { routes.getGroups(req, res, appUser, Manager); });

app.get(/data\/search\/users\/(\w+)/, function (req, res) { routes.searchUsers(req, res, appUser, Manager); });
