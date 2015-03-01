/**
 * Admin controllers.
 * @param req
 * @param res
 */

var User = require('../app/models/user');
var Comment = require('../app/models/comment');
var Topic = require('../app/models/topic');
var slug = require('slug');


exports.topic_list = function(req,res){
    Topic.find({'date': Date.today()}, function(err,result){
        if(err) {console.log(err);}
        else{
            res.render('admin_topic_list.html', {
                topics: result
            });
        }
    });
    //{'date': Date.today()}
};

exports.new_topic_post = function(req, res){
    console.log();
    var title = req.body.title;
    if (title){
        console.log("Adding" + title);
        console.log(Date.today());
        var topic_slug = Date.today().toFormat("YYYYMMDD") + "-" + slug(title).toLowerCase();
        var topic = new Topic({'title': title, 'date': Date.today(), 'slug': topic_slug});
        topic.save();
        console.log(topic);
    }
    res.redirect('/admin/topic_list/')
};