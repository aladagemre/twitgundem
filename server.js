// server.js

// set up ======================================================================
// get all the tools we need

require('newrelic');
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var swig = require('swig');
var configDB = require('./config/database.js');
var flash = require('connect-flash');
var lusca = require('lusca');

RedisStore = require('connect-redis')(express.session);
var REDIS_URL = process.env.REDISCLOUD_URL || "redis://localhost";

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	//app.set('view engine', 'ejs'); // set up ejs for templating
    app.engine('html', swig.renderFile);

    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    app.use(express.static(__dirname + '/public'));

	// required for passport
	app.use(express.session({ store: new RedisStore({'url': REDIS_URL}), secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
    app.use(flash());
    app.use(function(req, res, next){
        res.locals.user = req.user;
        next();
    });
	app.use(flash()); // use connect-flash for flash messages stored in session
    app.use(lusca({
        csrf: true,
        csp: { /* ... */},
        xframe: 'SAMEORIGIN',
        p3p: 'ABCDEF',
        hsts: {maxAge: 31536000, includeSubDomains: true},
        xssProtection: true
    }));
});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
var server = app.listen(3000, '0.0.0.0', function() {
  console.log('Listening on port %d', server.address().port);
});

/*
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case its a HTTP server
    app.listen(port);
    console.log('The magic happens on port ' + port);
}
*/