var User = require('../app/models/user');
var Comment = require('../app/models/comment');
var flash = require('connect-flash');
var gravatar = require('nodejs-gravatar');

// PROFILE SECTION =========================
// /profil/:username/
exports.other_profile = function(req, res){
    User.findOne({username: req.params.username}, function(err, user){
        console.log(user);
        if (user){
            res.render('profile/other_profile_details.html', {target: user});
        }
    });
};

// /profil/
exports.my_profile = function(req, res) {
    if (req.user.username) {
        res.render('profile/index.html', {
            user : req.user,
        });
    } else {
        res.redirect('/setusername/');
    }
};

// /profil/yorumlar/
exports.my_comments = function(req, res){
    console.log("My comments");
    if (req.user.username) {
        Comment.find({author: req.user.username}).limit(10).exec(function(err, comments){
            res.render('profile/comments.html', {
                user : req.user,
                comments: comments,
            });
        });
    } else {
        res.redirect('/setusername/');
    }
};

exports.set_username_get = function(req,res){
    var suggestion = '';
    var twit_name = req.user.twitter.username;
    if (twit_name){
        User.find({'username': twit_name}, function(err, result){
            if (result.length == 0){
                // if no username uses as twit name, suggest it.
                suggestion = twit_name;
                req.flash('messages', undefined);
            } else {
                // if there's someone, say it's been used.
                req.flash('messages', twit_name + ' kullanıcı adı başkası tarafından kullanılıyor. Lütfen farklı bir kullanıcı adı seçin. ');
            }
            res.render('profile/set_username.html',{
                messages: req.flash('messages'),
                user: req.user,
                suggestion: suggestion
            });
        });
    } else {
        res.render('profile/set_username.html',{
            user: req.user,
        });
    }
};


exports.set_username_post = function(req,res){
    console.log(req.body.username);
    console.log(req.user);
    var username = req.body.username;
    if (!req.user.username){
        // if havent set username before,
        // check if the given username is used before.
        User.find({'username': username}, function (err, result){
            if (result.length > 0){
                // if used by another user, give error.
                req.flash('messages', username + ' kullanıcı adı başkası tarafından kullanılıyor. Lütfen farklı bir kullanıcı adı seçin.');
                res.render('profile/set_username.html',{
                    messages: req.flash('messages'),
                    user: req.user
                });
            } else {
                // if not used yet, set it.
                req.user.username = req.body.username;
                req.user.avatar = gravatar.imageUrl(req.user.twitter.username + "@twitteruser.com");
                //req.user.setPhoto(); //TODO: Let the user choose it.
                req.user.save(function(err){
                    if (err){console.log(err);}
                    res.redirect('/profil/')
                })
            }
        });
    }
};
