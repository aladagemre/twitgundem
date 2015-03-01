// config/auth.js

// expose our config directly to our application using module.exports
var APP_URL = process.env.APP_URL || "http://localhost:3000";
var TWITTER_API_KEY = process.env.TWITTER_API_KEY || '';
var TWITTER_API_SECRET = process.env.TWITTER_API_SECRET || '';

console.log(TWITTER_API_KEY);

module.exports = {

	'facebookAuth' : {
		'clientID' 		: 'your-secret-clientID-here', // your App ID
		'clientSecret' 	: 'your-client-secret-here', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: TWITTER_API_KEY,
		'consumerSecret' 	: TWITTER_API_SECRET,
		'callbackURL' 		: APP_URL + '/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: 'your-secret-clientID-here',
		'clientSecret' 	: 'your-client-secret-here',
		'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
	}

};
