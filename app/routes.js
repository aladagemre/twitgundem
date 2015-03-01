require('date-utils');
var Topic = require('../app/models/topic');
var Comment = require('../app/models/comment');
var User = require('../app/models/user');
//var paginate = require('mongoose-paginate');
var slug = require('slug');

function getToday(){
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();

    return new Date(year, month, day);
}

var mainController = require('../controllers/main');
var profileController = require('../controllers/profile');
var topicController = require('../controllers/topics');
var adminController = require('../controllers/admin');

module.exports = function(app, passport) {
// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', mainController.index);
    app.get('/hakkinda/', mainController.hakkinda);

	// PROFILE SECTION =========================
    app.get('/profil/:username/', isLoggedIn, profileController.other_profile);
	app.get('/profil/', isLoggedIn, profileController.my_profile);
    app.get('/yorumlarim/', isLoggedIn, profileController.my_comments);
    app.get('/setusername/', isLoggedIn, profileController.set_username_get);
    app.post('/setusername/', isLoggedIn, profileController.set_username_post);

    /* Topics */
    app.get('/konular/', topicController.topics);
    app.get('/konular/:slug/', topicController.topic_detail);
    app.post('/konular/:slug/comment/', topicController.comment_post);

    /* Admin */
    app.get('/admin/topic_list/', isAdmin, adminController.topic_list);
    app.post('/admin/new_topic/', isAdmin, adminController.new_topic_post);

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================
    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		app.get('/login', function(req, res) {
			res.render('login.ejs', { message: req.flash('loginMessage') });
		});

		// process the login form
		app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/profil/', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

		// SIGNUP =================================
		// show the signup form
		app.get('/signup', function(req, res) {
			res.render('signup.ejs', { message: req.flash('signupMessage') });
		});

		// process the signup form
		app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/profil/', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

		// handle the callback after facebook has authenticated the user
		app.get('/auth/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect : '/profil/',
				failureRedirect : '/'
			}));

	// twitter --------------------------------

		// send to twitter to do the authentication
		app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

		// handle the callback after twitter has authenticated the user
		app.get('/auth/twitter/callback',
			passport.authenticate('twitter', {
				successRedirect : '/profil/',
				failureRedirect : '/'
			}));


	// google ---------------------------------

		// send to google to do the authentication
		app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

		// the callback after google has authenticated the user
		app.get('/auth/google/callback',
			passport.authenticate('google', {
				successRedirect : '/profil/',
				failureRedirect : '/'
			}));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

	// locally --------------------------------
		app.get('/connect/local', function(req, res) {
			res.render('connect-local.ejs', { message: req.flash('loginMessage') });
		});
		app.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/profil/', // redirect to the secure profile section
			failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

		// handle the callback after facebook has authorized the user
		app.get('/connect/facebook/callback',
			passport.authorize('facebook', {
				successRedirect : '/profil/',
				failureRedirect : '/'
			}));

	// twitter --------------------------------

		// send to twitter to do the authentication
		app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

		// handle the callback after twitter has authorized the user
		app.get('/connect/twitter/callback',
			passport.authorize('twitter', {
				successRedirect : '/profil/',
				failureRedirect : '/'
			}));


	// google ---------------------------------

		// send to google to do the authentication
		app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

		// the callback after google has authorized the user
		app.get('/connect/google/callback',
			passport.authorize('google', {
				successRedirect : '/profil/',
				failureRedirect : '/'
			}));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	app.get('/unlink/local', function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/profil/');
		});
	});

	// facebook -------------------------------
	app.get('/unlink/facebook', function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/profil/');
		});
	});

	// twitter --------------------------------
	app.get('/unlink/twitter', function(req, res) {
		var user           = req.user;
		user.twitter.token = undefined;
		user.save(function(err) {
			res.redirect('/profil/');
		});
	});

	// google ---------------------------------
	app.get('/unlink/google', function(req, res) {
		var user          = req.user;
		user.google.token = undefined;
		user.save(function(err) {
			res.redirect('/profil/');
		});
	});

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/auth/twitter');
}

function isAdmin(req,res, next){
    if (!req.isAuthenticated())
        res.redirect('/auth/twitter');

    if (req.user && (req.user.username == "aladagemre" || req.user.admin)){
        return next();
    } else {
        res.status(403);
        res.send('Yetkisiz işlem');
    }
}
