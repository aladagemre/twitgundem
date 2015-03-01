var mongoose = require('mongoose');
var Comment = require('./comment')


/**
 * Getters
 */

var getTags = function (tags) {
    return tags.join(',')
}

/**
 * Setters
 */

var setTags = function (tags) {
    return tags.split(',')
}

var topicSchema = new mongoose.Schema({
    title: String,
    slug: String,
    date: Date,
    author: String,
    tags: {type: [], get: getTags, set: setTags}
});

module.exports = mongoose.model('Topic', topicSchema, "topics");

