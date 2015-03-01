var mongoose = require('mongoose');
var User = require('./user')
var userSchema = require('mongoose').model('User')

var commentSchema = new mongoose.Schema({
    text: String,
    author: String,
    createdAt: { type : Date, default : Date.now },
    upvoters: [userSchema],
    downvoters: [userSchema],
    topic: {type: mongoose.Schema.ObjectId, ref: 'Topic'}
});


module.exports = mongoose.model('Comment', commentSchema);