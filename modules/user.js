var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    id: String,
    password: String,
    name: String,
    type: String,
    email: String,
    donated: Array,
    received: Array
});

module.exports = mongoose.model("user",userSchema);