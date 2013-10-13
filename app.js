/*jshint node: true */
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
//passport
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
//app config
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

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log("Serwer nasłuchuje na porcie " + app.get('port'));
});

var appData = require('./lib/data.js')();
var appServer = require('./lib/server.js');

appServer.listen(server, appData);