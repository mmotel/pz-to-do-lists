/*jshint node: true */
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
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

var appData = require('./lib/data.js')();
var appUser = require('./lib/user.js')(appData);
var appServer = require('./lib/server.js');

appServer.listen(server, appUser);

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
		console.log("id: " + profile.id + " name: " + profile.displayName);
		done(null, { id: profile.id, name: profile.name });
	}
));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/' }));

app.get('/logout', function(req, res){
	//TO DO: remove user from loggedin users list
	req.logout();
	res.redirect('/');
});

app.get('/getLogin', function(req, res){
	var loggedin = null;
	console.log(req.sessionID);

	//TO DO: find user on loggedin users list by session id

	res.writeHead(200, {
		'Content-Type': 'application/json; charset=utf8'
	});
	res.end(JSON.stringify(loggedin));
	//}
});
