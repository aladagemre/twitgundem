// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var gravatar = require('nodejs-gravatar');

// define the schema for our user model
var userSchema = mongoose.Schema({
    username         : String,
    avatar           : String,
    admin            : Boolean,
    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.getName = function(){
    return this.username || this.twitter.username || this.local.email || this.google.name || this.facebook.name;
}

userSchema.methods.setPhoto = function(){
    this.avatar = gravatar.imageUrl(this.local.email);
    this.save(function(err){
        console.log(err);
    })
    /*if (this.facebook.hasOwnProperty("id")){
        this.avatar = "//graph.facebook.com/" + this.facebook.id + "/picture?type=large";
    } else if (this.local.hasOwnProperty("email")){
        console.log("Gravatar from local email.");
        this.avatar = gravatar.imageUrl(this.local.email);
    } else if (this.google.hasOwnProperty("email")){
        this.avatar = gravatar.imageUrl(this.google.email);
    }
    return this.avatar;*/
}
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
