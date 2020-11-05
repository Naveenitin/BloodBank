var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    type: String,
    email: String,
    donated: Array,
    received: Array
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user",userSchema);