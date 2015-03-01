var User = require('../app/models/user');
var Comment = require('../app/models/comment');
var Topic = require('../app/models/topic');

exports.topics = function(req, res) {
    Topic.find({'date': Date.today()}, function(err, result){
        if (err) {console.log(err);}
        else {
            res.render('topics', {
                topics: result,
                date: Date.today().toFormat("DD.MM.YYYY")
            });
        }
    });
};

// /konular/:slug/
exports.topic_detail = function(req, res){
    Topic.findOne({'slug': req.params.slug}, function(err, topic){
        if (err) {console.log(err);}
        else {
            Comment.find({'topic': topic.id}).sort('-createdAt').exec(function(err2, comments){
                if (err2) {console.log(err2);}
                else {
                    res.render('topic_detail', {
                        topic: topic,
                        comments: comments
                    });
                }
            });
        }
    });
};

// /konular/:slug/comment/
exports.comment_post = function(req, res){
    Topic.findOne({'slug': req.params.slug}, function(err, topic){

        if (err) {console.log(err);}
        else {
            var comment = new Comment({text: req.body.text, author: req.user.username, topic: topic});
            comment.save(function (err){
                if (!err) console.log("success in saving");
                else console.log("could not save"+ err);
            });
            res.redirect('/konular/'+req.params.slug + '/');
        }
    });
};
